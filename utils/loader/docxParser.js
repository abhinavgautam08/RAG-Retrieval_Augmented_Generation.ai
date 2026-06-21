const mammoth = require('mammoth');

async function parseDocx(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || '';
  } catch (error) {
    throw new Error(`DOCX parse error: ${error.message}`);
  }
}

module.exports = { parseDocx };
