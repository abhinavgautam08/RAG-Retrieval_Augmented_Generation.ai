const fs = require('fs');
const path = require('path');
const { parsePdf } = require('./pdfParser');
const { parseDocx } = require('./docxParser');
const { parseImage } = require('./ocrParser');

const TEXT_EXTS = ['.txt', '.md', '.csv', '.json'];
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.bmp', '.tiff'];

async function loadDocument(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const name = path.basename(filePath);
  const buffer = fs.readFileSync(filePath);

  let text = '';

  if (TEXT_EXTS.includes(ext)) {
    text = buffer.toString('utf-8');
  } else if (ext === '.pdf') {
    text = await parsePdf(buffer);
  } else if (ext === '.docx') {
    text = await parseDocx(buffer);
  } else if (IMAGE_EXTS.includes(ext)) {
    text = await parseImage(filePath);
  } else {
    throw new Error(`Unsupported format: ${ext}`);
  }

  return { name, ext, text: text.trim() };
}

module.exports = { loadDocument };
