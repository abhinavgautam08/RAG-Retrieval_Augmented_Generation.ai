const { STOPWORDS } = require('./stopwords');
const { DOMAIN_IDF } = require('./domainIdf');
const { stemWord } = require('./stemmer');

function getBaseWordWeight(word, wordLower, isQuery) {
  let baseWeight = 1.0;
  if (STOPWORDS.has(wordLower)) {
    return 0.08;
  }
  if (word === word.toUpperCase() && word.length >= 2) {
    baseWeight *= isQuery ? 1.8 : 1.6;
  } else if (word[0] === word[0].toUpperCase() && word.slice(1) === word.slice(1).toLowerCase()) {
    baseWeight *= isQuery ? 1.4 : 1.3;
  }
  if (word.length > 4) {
    baseWeight *= 1.0 + 0.12 * Math.log(word.length);
  }
  if (/^\d+(\.\d+)?%?$/.test(word) || /^v\d+(\.\d+)?$/.test(word)) {
    baseWeight *= 1.5;
  }
  return baseWeight;
}

function getWordWeight(word, wordLower, isQuery, dynamicIdf = {}) {
  let baseWeight = getBaseWordWeight(word, wordLower, isQuery);
  if (STOPWORDS.has(wordLower)) return baseWeight;
  const stemmed = stemWord(wordLower);
  if (dynamicIdf && dynamicIdf[stemmed] !== undefined) {
    baseWeight *= dynamicIdf[stemmed];
  } else if (DOMAIN_IDF[stemmed] !== undefined) {
    baseWeight *= DOMAIN_IDF[stemmed];
  }
  return baseWeight;
}

module.exports = { getWordWeight };
