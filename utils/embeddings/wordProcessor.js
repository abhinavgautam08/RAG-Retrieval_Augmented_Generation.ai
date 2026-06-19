const { STOPWORDS } = require('./stopwords');
const { ABBREVIATIONS } = require('./abbreviations');
const { stemWord } = require('./stemmer');
const { decompoundWord } = require('./decompound');
const { getWordWeight } = require('./wordWeighter');
const { generateNgrams } = require('./ngramGenerator');

function processWord(word, isQuery, dynamicIdf, reverseAbbr, weights) {
  const wordLower = word.toLowerCase();
  const baseWeight = getWordWeight(word, wordLower, isQuery, dynamicIdf);
  const stemmed = stemWord(wordLower);
  const wordFeatures = [[stemmed, baseWeight * weights.unigram]];

  if (!STOPWORDS.has(wordLower)) {
    const subTokens = decompoundWord(word);
    if (subTokens.length > 1) {
      for (const subT of subTokens) {
        const subStemmed = stemWord(subT);
        const subWeight = getWordWeight(subT, subT.toLowerCase(), isQuery, dynamicIdf) * weights.decompound;
        wordFeatures.push([subStemmed, subWeight]);
      }
    }
  }
  if (ABBREVIATIONS[wordLower] !== undefined) {
    for (const expWord of ABBREVIATIONS[wordLower]) {
      wordFeatures.push([stemWord(expWord), baseWeight * 0.8 * weights.acronym]);
    }
  }
  if (reverseAbbr[stemmed] !== undefined) {
    for (const abbrKey of reverseAbbr[stemmed]) {
      wordFeatures.push([abbrKey, baseWeight * 0.8 * weights.acronym]);
    }
  }
  const ngrams = generateNgrams(wordLower, stemmed, weights.subword_ngram, weights.typo_boundary, baseWeight);
  wordFeatures.push(...ngrams);
  return { wordLower, wordFeatures };
}

module.exports = { processWord };
