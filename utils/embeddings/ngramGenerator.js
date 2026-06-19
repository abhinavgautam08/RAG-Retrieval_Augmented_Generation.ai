const { STOPWORDS } = require('./stopwords');

function generateNgrams(wordLower, stemmed, weightsNgram, weightsTypo, baseWeight) {
  const ngrams = [];
  if (!STOPWORDS.has(wordLower) && wordLower.length >= 5) {
    ngrams.push([`pre_${wordLower.slice(0, 3)}`, 0.3 * baseWeight * weightsTypo]);
    ngrams.push([`suf_${wordLower.slice(-3)}`, 0.3 * baseWeight * weightsTypo]);
  }
  if (stemmed.length >= 3) {
    for (let i = 0; i < stemmed.length - 2; i++) {
      ngrams.push([stemmed.slice(i, i + 3), 0.22 * weightsNgram]);
    }
  }
  if (stemmed.length >= 4) {
    for (let i = 0; i < stemmed.length - 3; i++) {
      ngrams.push([stemmed.slice(i, i + 4), 0.35 * weightsNgram]);
    }
  }
  if (wordLower !== stemmed) {
    if (wordLower.length >= 3) {
      for (let i = 0; i < wordLower.length - 2; i++) {
        ngrams.push([wordLower.slice(i, i + 3), 0.18 * weightsNgram]);
      }
    }
    if (wordLower.length >= 4) {
      for (let i = 0; i < wordLower.length - 3; i++) {
        ngrams.push([wordLower.slice(i, i + 4), 0.28 * weightsNgram]);
      }
    }
  }
  return ngrams;
}

module.exports = { generateNgrams };
