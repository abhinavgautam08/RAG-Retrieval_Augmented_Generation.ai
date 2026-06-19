const { STOPWORDS } = require('./stopwords');
const { stemWord } = require('./stemmer');
const { decompoundWord } = require('./decompound');

function updateCorpusIdf(allChunks) {
  if (!allChunks || allChunks.length === 0) {
    return {};
  }
  const docCounts = {};
  const totalDocs = allChunks.length;
  for (const chunk of allChunks) {
    const words = Array.from(new Set(chunk.toLowerCase().match(/\w+/g) || []));
    const stemmedWords = new Set();
    for (const w of words) {
      if (!STOPWORDS.has(w)) {
        stemmedWords.add(stemWord(w));
      }
    }
    for (const w of words) {
      if (!STOPWORDS.has(w)) {
        const parts = decompoundWord(w);
        if (parts.length > 1) {
          for (const p of parts) {
            stemmedWords.add(stemWord(p));
          }
        }
      }
    }
    for (const word of stemmedWords) {
      docCounts[word] = (docCounts[word] || 0) + 1;
    }
  }
  const dynamicIdf = {};
  for (const [word, count] of Object.entries(docCounts)) {
    const idf = Math.log((totalDocs + 1.0) / (count + 0.5)) + 1.0;
    dynamicIdf[word] = idf;
  }
  return dynamicIdf;
}

module.exports = { updateCorpusIdf };
