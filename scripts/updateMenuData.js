const { MongoClient, ServerApiVersion } = require("mongodb");
const fs = require('fs').promises;
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();

async function fetchMenuData(hostel, mess) {
  const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
    const collection = client.db("client").collection("menu");

    const data = await collection.findOne({
      hostel: Number(hostel),
      mess: Number(mess),
    });

    await client.close();

    if (!data) {
      return {
        hostel: 0,
        mess: 0,
        menu: [],
      };
    } else {
      const { _id, ...result } = data;
      return result;
    }
  } catch (error) {
    console.error(`Error fetching data for hostel ${hostel}, mess ${mess}:`, error);
    await client.close();
    return {
      hostel: 0,
      mess: 0,
      menu: [],
    };
  }
}

async function updateMenuData() {
  const publicDir = path.join(process.cwd(), 'public', 'menu-data');

  // Ensure the directory exists
  await fs.mkdir(publicDir, { recursive: true });

  for (let hostel = 1; hostel <= 2; hostel++) {
    for (let mess = 1; mess <= 3; mess++) {
      const data = await fetchMenuData(hostel, mess);
      if (data) {
        const fileName = `hostel-${hostel}-mess-${mess}.json`;
        const filePath = path.join(publicDir, fileName);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        console.log(`Updated ${fileName}`);
      }
    }
  }
}

updateMenuData().then(() => console.log('Menu data update complete'));
