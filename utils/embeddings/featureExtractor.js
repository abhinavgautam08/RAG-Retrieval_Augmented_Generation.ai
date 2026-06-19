const { extractBigrams } = require('./bigramExtractor');
const { processWord } = require('./wordProcessor');
const { STOPWORDS } = require('./stopwords');

function getFeatures(text, rawCasedWords, weights, isQuery, dynamicIdf, reverseAbbr) {
  const extractedFeatures = extractBigrams(text, weights.bigram);
  let negated = false;
  let negationCounter = 0;
  const negationTriggers = new Set(['no', 'not', 'without', 'never', 'except', 'none', 'neither', 'nor']);

  for (const word of rawCasedWords) {
    if (negationTriggers.has(word.toLowerCase())) {
      negated = true;
      negationCounter = 3;
      extractedFeatures.push([word.toLowerCase(), 0.5]);
      continue;
    }
    if (negated) {
      negationCounter--;
      if (negationCounter <= 0) negated = false;
    }
    const { wordLower, wordFeatures } = processWord(word, isQuery, dynamicIdf, reverseAbbr, weights);
    if (negated && !STOPWORDS.has(wordLower)) {
      for (const [tok, w] of wordFeatures) {
        extractedFeatures.push([`not_${tok}`, w * 0.9], [tok, w * 0.1]);
      }
    } else {
      extractedFeatures.push(...wordFeatures);
    }
  }
  return extractedFeatures;
}

module.exports = { getFeatures };
