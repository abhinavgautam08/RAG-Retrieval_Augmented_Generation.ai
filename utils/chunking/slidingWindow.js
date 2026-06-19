function chunkText(text, chunkSize = 500, chunkOverlap = 100) {
  const chunks = [];
  if (!text || !text.trim()) return chunks;
  if (chunkSize <= 0) chunkSize = 500;
  if (chunkOverlap < 0) chunkOverlap = 0;
  if (chunkOverlap >= chunkSize) chunkOverlap = Math.floor(chunkSize / 2);

  const textLen = text.length;
  let start = 0;
  while (start < textLen) {
    let end = start + chunkSize;
    if (end < textLen) {
      const lastSpace = text.lastIndexOf(' ', end);
      if (lastSpace !== -1 && lastSpace > start) {
        end = lastSpace;
      }
    }
    const chunk = text.slice(start, end).trim();
    if (chunk) chunks.push(chunk);
    const nextStart = end - chunkOverlap;
    start = (nextStart <= start) ? end : nextStart;
  }
  return chunks;
}

module.exports = { chunkText };
