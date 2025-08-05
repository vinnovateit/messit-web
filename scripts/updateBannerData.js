const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require('fs').promises;
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();

async function fetchBannerData() {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    const collection = client.db("client").collection("banners");

    const data = await collection.find({}).toArray();

    await client.close();

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching banner data:', error);
    await client.close();
    return [];
  }
}

async function processBannerData(banners) {
  const publicBannersDir = path.join(process.cwd(), 'public', 'banners');
  const publicDataDir = path.join(process.cwd(), 'public', 'banner-data');

  // Ensure the directories exist
  await fs.mkdir(publicBannersDir, { recursive: true });
  await fs.mkdir(publicDataDir, { recursive: true });

  const processedBanners = [];

  for (let i = 0; i < banners.length; i++) {
    const banner = banners[i];
    
    // console.log(`Processing banner ${i}:`, JSON.stringify(banner, null, 2));
    
    try {
      // Extract image if it exists
      let imagePath = null;
      if (banner.image && banner.image.buffer) {
        const imageBuffer = banner.image.buffer;
        
        const imageFileName = `banner-${banner._id || i}.jpg`;
        const imageFilePath = path.join(publicBannersDir, imageFileName);
        
        await fs.writeFile(imageFilePath, imageBuffer);
        
        imagePath = `/banners/${imageFileName}`;
        
        console.log(`Extracted image: ${imageFileName}`);
      } else if (banner.image && banner.image.$binary && banner.image.$binary.base64) {
        // If raw MongoDB format
        const imageBuffer = Buffer.from(banner.image.$binary.base64, 'base64');
        
        const imageFileName = `banner-${banner._id || i}.jpg`;
        const imageFilePath = path.join(publicBannersDir, imageFileName);
        
        await fs.writeFile(imageFilePath, imageBuffer);
        
        imagePath = `/banners/${imageFileName}`;
        
        console.log(`Extracted image: ${imageFileName}`);
      }

      // Transparently copy banner data
      const processedBanner = { ...banner };
      
      // special MongoDB fields
      if (banner._id) {
        processedBanner.id = banner._id.$oid || banner._id.toString() || `banner-${i}`;
        delete processedBanner._id;
      } else {
        processedBanner.id = `banner-${i}`;
      }
      
      // replace binary image with imagePath
      if (processedBanner.image) {
        delete processedBanner.image;
        processedBanner.imagePath = imagePath;
      }
      
      // date objects to ISO strings
      if (processedBanner.eventdate && processedBanner.eventdate.$date) {
        processedBanner.eventdate = processedBanner.eventdate.$date;
      }
      
      // nested sourceinfo dates
      if (processedBanner.sourceinfo && processedBanner.sourceinfo.createdAt) {
        if (processedBanner.sourceinfo.createdAt.$date) {
          processedBanner.createdAt = processedBanner.sourceinfo.createdAt.$date;
        } else {
          processedBanner.createdAt = processedBanner.sourceinfo.createdAt;
        }
        delete processedBanner.sourceinfo;
      }

      processedBanners.push(processedBanner);
    } catch (error) {
      console.error(`Error processing banner ${i}:`, error);
    }
  }

  processedBanners.sort((a, b) => {
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
  });

  return processedBanners;
}

async function updateBannerData() {
  console.log('Fetching banner data from MongoDB...');
  
  const banners = await fetchBannerData();
  
  if (banners.length === 0) {
    console.log('No banner data found');
    return;
  }

  console.log(`Found ${banners.length} banners`);

  const processedBanners = await processBannerData(banners);

  const campaignsFilePath = path.join(process.cwd(), 'public', 'banner-data', 'campaigns.json');
  await fs.writeFile(campaignsFilePath, JSON.stringify(processedBanners, null, 2));

  console.log(`Updated campaigns.json with ${processedBanners.length} banners`);
  console.log('Banner data update complete');
}

updateBannerData().catch(console.error);
