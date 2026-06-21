const pdfParse = require('pdf-parse');

async function parsePdf(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text || '';
  } catch (error) {
    throw new Error(`PDF parse error: ${error.message}`);
  }
}

module.exports = { parsePdf };
