const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require('fs').promises;
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();

// Bump only on a breaking change. Apps ignore a feed newer than they know.
const SCHEMA_VERSION = 1;

const VALID_KINDS = ['event', 'project', 'announcement', 'notice', 'promo', 'other'];
const VALID_PLACEMENTS = ['home_strip', 'notifications'];
const VALID_VARIANTS = ['compact_strip', 'banner_card', 'detail_card', 'text_only'];
const VALID_ACTION_TYPES = ['url', 'route', 'expand', 'copy', 'none'];
const VALID_ACTION_STYLES = ['arrow', 'filled', 'text'];
const VALID_BADGE_TONES = ['accent', 'success', 'warning', 'danger'];
const VALID_MEDIA_TYPES = ['logo', 'image', 'illustration'];
const VALID_ICONS = ['clock', 'calendar', 'gift', 'trophy', 'location', 'rupee',
  'users', 'link', 'info', 'star', 'check', 'alert'];

async function fetchContentData() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    const collection = client.db("client").collection("content");
    const data = await collection.find({}).toArray();
    return data || [];
  } catch (error) {
    // Deliberately fatal. Swallowing this would publish an empty feed and
    // delete every image — unpublishing all content because of a blip.
    // An empty *collection* is fine; an unreachable database is not.
    throw new Error(`Could not read content from MongoDB: ${error.message}`);
  } finally {
    await client.close().catch(() => {});
  }
}

// --- normalisation helpers -------------------------------------------------

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

// Drops the object entirely when nothing survives, so the app never has to
// reason about half-populated slots.
function compact(obj) {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return Object.keys(out).length > 0 ? out : null;
}

// --- slot mappers ----------------------------------------------------------

function mapFacts(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((f) => {
      const text = str(f && f.text);
      if (!text) return null;
      return compact({
        icon: enumOr(VALID_ICONS, f.icon, 'info'),
        label: str(f.label),
        text,
      });
    })
    .filter(Boolean);
}

function mapActions(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((a) => {
      const type = enumOr(VALID_ACTION_TYPES, a && a.type, 'none');
      const value = str(a && a.value);
      if (type === 'none') return null;
      if (type !== 'expand' && !value) return null;
      // A non-https link would be dropped by the app anyway — drop it here
      // so a bad entry is visible at build time.
      if (type === 'url' && !value.startsWith('https://')) {
        console.warn(`  ! dropping non-https action: ${value}`);
        return null;
      }
      return compact({
        type,
        value,
        label: str(a.label),
        style: enumOr(VALID_ACTION_STYLES, a.style, 'arrow'),
        primary: a.primary === true,
      });
    })
    .filter(Boolean);
}

function mapTimeframe(raw) {
  if (!raw) return null;
  const displayLabel = str(raw.displayLabel);
  if (!displayLabel) return null;
  return compact({
    displayLabel,
    start: isoDate(raw.start),
    end: isoDate(raw.end),
    icon: enumOr(VALID_ICONS, raw.icon, 'calendar'),
    showCountdown: raw.showCountdown === true,
  });
}

function mapBadge(raw) {
  if (!raw) return null;
  const text = str(raw.text);
  if (!text) return null;
  return { text, tone: enumOr(VALID_BADGE_TONES, raw.tone, 'accent') };
}

function mapTheme(raw) {
  if (!raw) return null;
  return compact({
    accent: str(raw.accent),
    bg: str(raw.bg),
    bgLight: str(raw.bgLight),
    text: str(raw.text),
    textLight: str(raw.textLight),
  });
}

function mapAudience(raw) {
  if (!raw) return null;
  const list = (v) => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);
  return compact({
    hostels: list(raw.hostels),
    messTypes: list(raw.messTypes),
    platforms: list(raw.platforms),
  });
}

function mapPlacements(raw) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const p of raw) {
    const v = enumOr(VALID_PLACEMENTS, p, null);
    if (v && !out.includes(v)) out.push(v);
  }
  return out;
}

// --- media -----------------------------------------------------------------

async function writeMedia(item, id, mediaDir) {
  const media = item.media;
  if (!media) return { media: null, files: [] };

  const files = [];
  const slug = str(item.slug) || id;

  const light = toBuffer(media.data);
  if (!light) return { media: null, files: [] };

  const lightName = `${slug}-${id}.${media.ext || 'jpg'}`;
  await fs.writeFile(path.join(mediaDir, lightName), light);
  files.push(lightName);

  let darkPath = null;
  const dark = toBuffer(media.dataDark);
  if (dark) {
    const darkName = `${slug}-${id}-dark.${media.extDark || media.ext || 'jpg'}`;
    await fs.writeFile(path.join(mediaDir, darkName), dark);
    files.push(darkName);
    darkPath = `/content-media/${darkName}`;
  }

  return {
    media: compact({
      type: enumOr(VALID_MEDIA_TYPES, media.type, 'image'),
      src: `/content-media/${lightName}`,
      srcDark: darkPath,
      alt: str(media.alt),
      aspectRatio: typeof media.aspectRatio === 'number' && media.aspectRatio > 0
        ? media.aspectRatio
        : 1.0,
    }),
    files,
  };
}

// --- item ------------------------------------------------------------------

async function mapItem(raw, index, mediaDir) {
  const id = raw._id ? raw._id.toString() : `content-${index}`;
  const title = str(raw.title);
  if (!title) {
    console.warn(`  ! skipping item ${id}: no title`);
    return { item: null, files: [] };
  }

  const placements = mapPlacements(raw.placements);
  if (placements.length === 0) {
    console.warn(`  ! skipping item ${id}: no valid placements`);
    return { item: null, files: [] };
  }

  const { media, files } = await writeMedia(raw, id, mediaDir);

  const item = {
    id,
    slug: str(raw.slug) || id,
    kind: enumOr(VALID_KINDS, raw.kind, 'other'),
    active: raw.active !== false,
    priority: Number.isFinite(raw.priority) ? raw.priority : 0,
    visibleFrom: isoDate(raw.visibleFrom),
    visibleUntil: isoDate(raw.visibleUntil),
    createdAt: isoDate(raw.createdAt),
    updatedAt: isoDate(raw.updatedAt),

    placements,
    audience: mapAudience(raw.audience),
    minAppVersion: str(raw.minAppVersion),
    maxAppVersion: str(raw.maxAppVersion),
    dismissible: raw.dismissible === true,
    reappearAfterDays: Number.isFinite(raw.reappearAfterDays) ? raw.reappearAfterDays : null,

    media,
    eyebrow: str(raw.eyebrow),
    title,
    subtitle: str(raw.subtitle),
    body: str(raw.body),
    facts: mapFacts(raw.facts),
    timeframe: mapTimeframe(raw.timeframe),
    badge: mapBadge(raw.badge),
    actions: mapActions(raw.actions),

    variant: enumOr(VALID_VARIANTS, raw.variant, 'compact_strip'),
    theme: mapTheme(raw.theme),
  };

  // Strip nulls/empties — a smaller feed is a cheaper first paint.
  for (const key of Object.keys(item)) {
    const value = item[key];
    if (value === null || value === undefined) delete item[key];
    else if (Array.isArray(value) && value.length === 0 && key !== 'placements') delete item[key];
  }

  return { item, files };
}

// --- main ------------------------------------------------------------------

async function updateContentData() {
  console.log('Fetching content data from MongoDB...');

  const mediaDir = path.join(process.cwd(), 'public', 'content-media');
  const dataDir = path.join(process.cwd(), 'public', 'content-data');
  const feedPath = path.join(dataDir, 'feed.json');

  await fs.mkdir(mediaDir, { recursive: true });
  await fs.mkdir(dataDir, { recursive: true });

  const raw = await fetchContentData();
  console.log(`Found ${raw.length} content items`);

  const items = [];
  const keepFiles = new Set(['.gitkeep']);

  for (let i = 0; i < raw.length; i++) {
    try {
      const { item, files } = await mapItem(raw[i], i, mediaDir);
      if (!item) continue;
      // Inactive items are never published — the kill switch has to work
      // even for a client that ignores the `active` flag.
      if (!item.active) {
        console.log(`  - skipping inactive: ${item.slug}`);
        continue;
      }
      files.forEach((f) => keepFiles.add(f));
      items.push(item);
    } catch (error) {
      console.error(`Error processing content item ${i}:`, error);
    }
  }

  items.sort((a, b) => {
    if (a.priority !== b.priority) return b.priority - a.priority;
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  // Remove artwork belonging to items that no longer publish.
  try {
    const existing = await fs.readdir(mediaDir);
    for (const file of existing) {
      if (!keepFiles.has(file)) {
        await fs.unlink(path.join(mediaDir, file));
        console.log(`  - removed stale media: ${file}`);
      }
    }
  } catch (error) {
    console.error('Error cleaning content media:', error);
  }

  const feed = {
    schemaVersion: SCHEMA_VERSION,
    generatedAt: new Date().toISOString(),
    items,
  };

  await fs.writeFile(feedPath, JSON.stringify(feed, null, 2));
  console.log(`Updated feed.json with ${items.length} published items`);
  console.log('Content data update complete');
}

if (require.main === module) {
  updateContentData().catch((error) => {
    console.error(error.message);
    process.exit(1); // next.config.ts treats a non-zero exit as a failed build
  });
}

module.exports = { updateContentData, mapItem, mapFacts, mapActions, mapTimeframe, SCHEMA_VERSION };
