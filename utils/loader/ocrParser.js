const Tesseract = require('tesseract.js');

async function parseImage(filePath) {
  try {
    const { data } = await Tesseract.recognize(filePath, 'eng');
    return data.text || '';
  } catch (error) {
    throw new Error(`OCR parse error: ${error.message}`);
  }
}

module.exports = { parseImage };
