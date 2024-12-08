const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

// Your Airtable API details
const AIRTABLE_API_KEY = '<PERSONAL_API_KEY_WITH_WRITE_PERMISSIONS>';
const BASE_ID = '<BASE_ID>';
const TABLE_NAME = '<TABLE_NAME_(default: "Zadanka")>';
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

// Mock file upload function (using file.io for temporary hosting)
const uploadFileToHostingService = async (filePath) => {
  try {
    const fileName = filePath.split('/').pop();
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const response = await axios.post('https://file.io', form, {
      headers: { ...form.getHeaders() },
    });

    if (response.data.success) {
      console.log(`File uploaded (${fileName}):`, response.data.link);
      return response.data.link;
    } else {
      throw new Error('Failed to upload file');
    }
  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw error;
  }
};

// Main function
const main = async () => {
  const name = process.argv[2];
  const pdfFilePath = process.argv[3];
  const cppFilePath = process.argv[4];
  const group = process.argv[5] || '?';
  const points = parseInt(process.argv[6] || '0', 10);
  const level = process.argv[7] || '?';

  if (!name || !pdfFilePath || !cppFilePath) {
    console.error('Usage: node script.js <name> <pdfFilePath> <cppFilePath> [Grupa] [LiczbaPunktow] [PoziomTrudności]');
    process.exit(1);
  }

  if (!fs.existsSync(pdfFilePath) || !fs.existsSync(cppFilePath)) {
    console.error('Invalid file path(s).');
    process.exit(1);
  }

  try {
    const pdfUrl = await uploadFileToHostingService(pdfFilePath);
    const cppUrl = await uploadFileToHostingService(cppFilePath);
    const cppSnippet = fs.readFileSync(cppFilePath, 'utf8');

    // Prepare Airtable payload
    const payload = {
      fields: {
        Nazwa: name,
        Grupa: group,
        'Poziom trudności': level,
        PDF: [{ url: pdfUrl }],
        Kod: cppSnippet,
        'Kod - plik': [{ url: cppUrl }],
        'Liczba Punktów': points,
      },
    };

    // Sync data to Airtable
    const response = await axios.post(AIRTABLE_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Record created successfully:', response.data.id);
  } catch (error) {
    console.error('Error in the process:', error.response?.data || error.message);
  }
};

main();
