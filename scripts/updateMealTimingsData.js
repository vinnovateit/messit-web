const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require('fs').promises;
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();

// Bump only on a breaking change. Apps ignore a file newer than they know.
const SCHEMA_VERSION = 1;

const MEALS = ['breakfast', 'lunch', 'snacks', 'dinner'];
const DAYS = ['weekday', 'weekend'];
const OVERRIDE_HOSTELS = ['mh', 'lh', 'both'];
const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const same = (start, end) => ({ weekday: { start, end }, weekend: { start, end } });

// Mirrors models.DefaultMealTimings() — what the app ships with today.
const DEFAULT_TIMINGS = {
  mh: {
    breakfast: { weekday: { start: '07:00', end: '09:00' }, weekend: { start: '07:30', end: '09:30' } },
    lunch: same('12:30', '14:30'),
    snacks: same('16:30', '18:15'),
    dinner: same('19:00', '21:00'),
  },
  lh: {
    breakfast: { weekday: { start: '07:00', end: '09:00' }, weekend: { start: '07:30', end: '09:30' } },
    lunch: { weekday: { start: '12:00', end: '14:00' }, weekend: { start: '12:30', end: '14:30' } },
    snacks: same('16:30', '18:00'),
    dinner: same('19:00', '21:00'),
  },
};

async function fetchMealTimings() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    const collection = client.db("client").collection("mealtimings");
    return await collection.findOne({ key: 'meal-timings' });
  } catch (error) {
    // Deliberately fatal, like the appearance config: publishing the default
    // timings because the database blipped would silently undo a change.
    throw new Error(`Could not read meal timings from MongoDB: ${error.message}`);
  } finally {
    await client.close().catch(() => {});
  }
}

// --- helpers ---------------------------------------------------------------

const minutes = (v) => {
  const [h, m] = v.split(':').map(Number);
  return h * 60 + m;
};

// Today in IST, as "YYYY-MM-DD", so ranges that have ended can be dropped.
function todayIST() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
}

function isoDate(value) {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

// Returns clean timings, or null if any window is missing, malformed or
// overlaps the meal before it. The admin enforces the same rules.
function cleanTimings(raw) {
  if (!raw) return null;
  const out = {};
  for (const meal of MEALS) {
    out[meal] = {};
    for (const day of DAYS) {
      const range = raw[meal] && raw[meal][day];
      if (!range || !HHMM.test(range.start) || !HHMM.test(range.end)) return null;
      if (minutes(range.end) <= minutes(range.start)) return null;
      out[meal][day] = { start: range.start, end: range.end };
    }
  }
  for (const day of DAYS) {
    for (let i = 1; i < MEALS.length; i++) {
      if (minutes(out[MEALS[i]][day].start) <= minutes(out[MEALS[i - 1]][day].end)) return null;
    }
  }
  return out;
}

function hostelTimings(raw, hostel) {
  const clean = cleanTimings(raw && raw[hostel]);
  if (raw && !clean) {
    console.warn(`  ! stored ${hostel.toUpperCase()} timings are invalid — publishing the defaults`);
  }
  return clean || DEFAULT_TIMINGS[hostel];
}

function mapOverrides(raw, today) {
  const out = [];
  for (const o of (raw && raw.overrides) || []) {
    const name = typeof o.name === 'string' ? o.name.trim() : '';
    const label = name || `${o.from} to ${o.to}`;
    const timings = cleanTimings(o.timings);
    if (!OVERRIDE_HOSTELS.includes(o.hostel) || !DATE.test(o.from) || !DATE.test(o.to) || o.to < o.from || !timings) {
      console.warn(`  ! skipping invalid custom range "${label}"`);
      continue;
    }
    // The file is static, so a range that already ended can never apply.
    if (o.to < today) continue;
    out.push({ name, hostel: o.hostel, from: o.from, to: o.to, timings });
  }
  return out.sort((a, b) => a.from.localeCompare(b.from));
}

// --- main ------------------------------------------------------------------

async function updateMealTimingsData() {
  console.log('Fetching meal timings from MongoDB...');

  const dataDir = path.join(process.cwd(), 'public', 'config-data');
  const filePath = path.join(dataDir, 'meal-timings.json');
  await fs.mkdir(dataDir, { recursive: true });

  const raw = await fetchMealTimings();
  const overrides = mapOverrides(raw, todayIST());

  const config = {
    schemaVersion: SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    updatedAt: raw ? isoDate(raw.updatedAt) : null,
    // Times are local "HH:MM" in this zone. Weekend uses ISO weekdays
    // (Mon = 1 ... Sun = 7), matching Dart's DateTime.weekday.
    timezone: 'Asia/Kolkata',
    weekendDays: [6, 7],
    mh: hostelTimings(raw, 'mh'),
    lh: hostelTimings(raw, 'lh'),
    // On a date inside a range, its timings replace the hostel's regular
    // ones. "both" applies to MH and LH. Ranges never overlap per hostel.
    overrides,
  };

  await fs.writeFile(filePath, JSON.stringify(config, null, 2));
  console.log(
    `Updated meal-timings.json (${raw ? 'stored' : 'default'} timings, ${overrides.length} upcoming custom ranges)`,
  );
  console.log('Meal timings update complete');
}

updateMealTimingsData().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
