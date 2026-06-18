const { stemWord } = require('./stemmer');

function extractBigrams(text, bigramWeight) {
  const features = [];
  const clauses = text.split(/[\.\,\;\?\!\:\n\-\—\–]+/);
  for (const clause of clauses) {
    const clauseWords = clause.match(/\w+/g) || [];
    for (let i = 0; i < clauseWords.length - 1; i++) {
      const w1 = clauseWords[i].toLowerCase();
      const w2 = clauseWords[i + 1].toLowerCase();
      const s1 = stemWord(w1);
      const s2 = stemWord(w2);
      features.push([`${s1}_${s2}`, 1.25 * bigramWeight]);
    }
  }
  return features;
}

module.exports = { extractBigrams };
