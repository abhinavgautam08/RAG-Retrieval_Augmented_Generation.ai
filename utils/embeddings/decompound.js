function decompoundWord(word) {
  const parts = word.split('_');
  const subWords = [];
  const regex = /[A-Z]?[a-z]+|[A-Z]+(?=[A-Z][a-z]|\b)|\d+/g;
  for (const part of parts) {
    if (!part) continue;
    const camelParts = part.match(regex);
    if (camelParts) {
      subWords.push(...camelParts);
    } else {
      subWords.push(part);
    }
  }
  return subWords.map(w => w.toLowerCase()).filter(Boolean);
}

module.exports = { decompoundWord };
