const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require('fs').promises;
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();

// Bump only on a breaking change. Apps ignore a file newer than they know.
const SCHEMA_VERSION = 1;

const VALID_POSITIONS = ['left', 'center', 'right'];
const VALID_SOURCES = ['builtin', 'image'];
const VALID_BUILTIN_ICONS = ['bell', 'bell_ring', 'megaphone', 'gift', 'star',
  'fire', 'calendar', 'envelope', 'sparkles', 'heart', 'trophy', 'mug'];

// Mirrors models.DefaultAppearance() — what the app ships with today.
const DEFAULT_ICON = {
  enabled: true,
  position: 'right',
  source: 'builtin',
  builtin: 'bell',
  size: 36,
  badgeDot: true,
};

async function fetchAppConfig() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    const collection = client.db("client").collection("appconfig");
    return await collection.findOne({ key: 'appearance' });
  } catch (error) {
    // Deliberately fatal, like the content feed: publishing a default header
    // because the database blipped would silently undo a deliberate change.
    throw new Error(`Could not read appearance config from MongoDB: ${error.message}`);
  } finally {
    await client.close().catch(() => {});
  }
}

// --- helpers ---------------------------------------------------------------

function enumOr(allowed, value, fallback) {
  if (typeof value !== 'string') return fallback;
  const v = value.trim().toLowerCase();
  return allowed.includes(v) ? v : fallback;
}

function str(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function isoDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  if (value.$date) {
    const d = new Date(value.$date);
    return isNaN(d.getTime()) ? null : d.toISOString();
  }
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

function toBuffer(field) {
  if (!field) return null;
  if (Buffer.isBuffer(field)) return field;
  if (field.buffer) return Buffer.from(field.buffer);
  if (field.$binary && field.$binary.base64) {
    return Buffer.from(field.$binary.base64, 'base64');
  }
  return null;
}

function compact(obj) {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;
    out[key] = value;
  }
  return out;
}

// --- media -----------------------------------------------------------------

async function writeIconImage(image, mediaDir) {
  if (!image) return { image: null, files: [] };

  const light = toBuffer(image.data);
  if (!light) return { image: null, files: [] };

  const files = [];
  const lightName = `notification-icon.${image.ext || 'png'}`;
  await fs.writeFile(path.join(mediaDir, lightName), light);
  files.push(lightName);

  let srcDark = null;
  const dark = toBuffer(image.dataDark);
  if (dark) {
    const darkName = `notification-icon-dark.${image.extDark || image.ext || 'png'}`;
    await fs.writeFile(path.join(mediaDir, darkName), dark);
    files.push(darkName);
    srcDark = `/config-media/${darkName}`;
  }

  return {
    image: compact({
      src: `/config-media/${lightName}`,
      srcDark,
      alt: str(image.alt),
    }),
    files,
  };
}

// --- mapping ---------------------------------------------------------------

async function mapNotificationIcon(raw, mediaDir) {
  if (!raw) return { icon: { ...DEFAULT_ICON }, files: [] };

  const { image, files } = await writeIconImage(raw.image, mediaDir);

  let source = enumOr(VALID_SOURCES, raw.source, 'builtin');
  // An "image" source with no usable file would blank the header, so fall
  // back rather than publish something the app cannot render.
  if (source === 'image' && !image) {
    console.warn('  ! icon source is "image" but no image was stored — using the builtin');
    source = 'builtin';
  }

  const size = typeof raw.size === 'number' && raw.size >= 16 && raw.size <= 64
    ? raw.size
    : DEFAULT_ICON.size;

  return {
    icon: compact({
      enabled: raw.enabled !== false,
      position: enumOr(VALID_POSITIONS, raw.position, DEFAULT_ICON.position),
      source,
      builtin: enumOr(VALID_BUILTIN_ICONS, raw.builtin, DEFAULT_ICON.builtin),
      image,
      tint: str(raw.tint),
      size,
      badgeDot: raw.badgeDot !== false,
    }),
    files,
  };
}

// --- main ------------------------------------------------------------------

async function updateAppConfigData() {
  console.log('Fetching appearance config from MongoDB...');

  const mediaDir = path.join(process.cwd(), 'public', 'config-media');
  const dataDir = path.join(process.cwd(), 'public', 'config-data');
  const filePath = path.join(dataDir, 'appearance.json');

  await fs.mkdir(mediaDir, { recursive: true });
  await fs.mkdir(dataDir, { recursive: true });

  const raw = await fetchAppConfig();

  const { icon, files } = await mapNotificationIcon(
    raw && raw.header ? raw.header.notificationIcon : null,
    mediaDir,
  );

  const config = compact({
    schemaVersion: SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    updatedAt: raw ? isoDate(raw.updatedAt) : null,
    visibleFrom: raw ? isoDate(raw.visibleFrom) : null,
    visibleUntil: raw ? isoDate(raw.visibleUntil) : null,
    minAppVersion: raw ? str(raw.minAppVersion) : null,
    header: {
      notificationIcon: icon,
    },
  });

  // Drop artwork that is no longer referenced.
  const keep = new Set(files);
  try {
    for (const file of await fs.readdir(mediaDir)) {
      if (!keep.has(file)) {
        await fs.unlink(path.join(mediaDir, file));
        console.log(`  - removed stale icon: ${file}`);
      }
    }
  } catch (error) {
    console.error('Error cleaning config media:', error);
  }

  await fs.writeFile(filePath, JSON.stringify(config, null, 2));
  console.log(
    `Updated appearance.json (${icon.source} "${icon.source === 'image' ? 'upload' : icon.builtin}", ${icon.position})`,
  );
  console.log('Appearance config update complete');
}

updateAppConfigData().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
