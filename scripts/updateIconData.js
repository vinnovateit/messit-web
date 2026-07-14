const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require('fs').promises;
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();

async function fetchIconData() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    const collection = client.db("client").collection("icons");

    const icons = await collection.find({}).toArray();

    await client.close();
    return icons;
  } catch (error) {
    console.error('Error fetching icon data:', error);
    await client.close();
    return [];
  }
}

async function processIconData(icons) {
  const publicDir = path.join(process.cwd(), 'public');
  const iconDataDir = path.join(publicDir, 'icon-data');
  const publicIconsJson = path.join(publicDir, 'icons.json');

  await fs.mkdir(iconDataDir, { recursive: true });

  // Filter active icons based on dates
  const now = new Date();
  const activeIcons = icons.filter(icon => {
    const startDate = icon.startDate ? new Date(icon.startDate) : null;
    const endDate = icon.endDate ? new Date(icon.endDate) : null;
    
    if (startDate && startDate > now) return false;
    if (endDate && endDate < now) return false;
    return true;
  });

  const iconData = activeIcons.map(icon => ({
    iconName: icon.iconName,
    startDate: icon.startDate,
    endDate: icon.endDate,
  }));

  // Write to public/icon-data/icons.json
  await fs.writeFile(
    path.join(iconDataDir, 'icons.json'),
    JSON.stringify(iconData, null, 2)
  );

  // Also write to public/icons.json for direct access at /icons.json
  await fs.writeFile(
    publicIconsJson,
    JSON.stringify(iconData, null, 2)
  );

  console.log(`Updated icon-data/icons.json with ${iconData.length} active icons`);
  console.log(`Updated icons.json with ${iconData.length} active icons`);
}

async function main() {
  console.log('Fetching icon data from MongoDB...');
  const icons = await fetchIconData();
  
  await processIconData(icons);
  
  console.log('Icon data update complete');
}

main().catch(console.error);