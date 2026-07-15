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

    if (!icons || icons.length === 0) {
      return [];
    }

    // Filter active icons based on dates
    const now = new Date();
    const activeIcons = icons.filter((icon) => {
      const startDate = icon.startdate ? new Date(icon.startdate) : null;
      const endDate = icon.enddate ? new Date(icon.enddate) : null;

      if (startDate && startDate > now) return false;
      if (endDate && endDate < now) return false;
      return true;
    });

    return activeIcons.map((icon) => ({
      iconName: icon.iconname || icon.iconName,
      startDate: icon.startdate || icon.startDate,
      endDate: icon.enddate || icon.endDate,
    }));
  } catch (error) {
    console.error('Error fetching icon data:', error);
    await client.close();
    return [];
  }
}

async function updateIconData() {
  console.log('Fetching icon data from MongoDB...');

  const publicDir = path.join(process.cwd(), 'public');
  const iconsFilePath = path.join(publicDir, 'icons.json');
  await fs.mkdir(publicDir, { recursive: true });

  const icons = await fetchIconData();

  if (icons.length === 0) {
    await fs.writeFile(iconsFilePath, JSON.stringify([], null, 2));
    console.log('No icon data found. Created empty icons.json');
    return;
  }

  await fs.writeFile(iconsFilePath, JSON.stringify(icons, null, 2));

  console.log(`Updated icons.json with ${icons.length} active icons`);
  console.log('Icon data update complete');
}

updateIconData().catch(console.error);