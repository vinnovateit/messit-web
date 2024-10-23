const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const API_BASE_URL = 'https://messit-server-vinnovateit.vercel.app';
// const API_BASE_URL = 'http://localhost:8000';

async function fetchMenuData(hostel, mess) {
  try {
    const response = await axios.get(`${API_BASE_URL}/?hostel=${hostel}&mess=${mess}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for hostel ${hostel}, mess ${mess}:`, error);
    return null;
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
