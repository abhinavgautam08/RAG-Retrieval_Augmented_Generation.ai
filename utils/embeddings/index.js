const { ABBREVIATIONS } = require('./abbreviations');
const { profileQuery } = require('./queryProfiler');
const { getFeatures } = require('./featureExtractor');
const { projectHash } = require('./hashProjector');
const { normalizeL2 } = require('./normalizer');
const { updateCorpusIdf } = require('./idfUpdater');

class Embedder {
  constructor(modelName = 'reon-v10') {
    this.modelName = modelName;
    this.dimension = 384;
    this.dynamicIdf = {};
    this.reverseAbbr = {};
    for (const [abbr, words] of Object.entries(ABBREVIATIONS)) {
      for (const w of words) {
        if (!this.reverseAbbr[w]) this.reverseAbbr[w] = [];
        this.reverseAbbr[w].push(abbr);
      }
    }
  }

  updateCorpusIdf(allChunks) {
    this.dynamicIdf = updateCorpusIdf(allChunks);
  }

  _textToVector(text) {
    if (!text || !text.trim()) return new Array(this.dimension).fill(0.0);
    const rawCasedWords = text.match(/\w+/g) || [];
    if (rawCasedWords.length === 0) return new Array(this.dimension).fill(0.0);
    const weights = profileQuery(rawCasedWords);
    const queryIndicators = new Set(['what', 'how', 'why', 'who', 'where', 'when', 'which', 'is', 'define', 'explain', 'search']);
    const isQuery = rawCasedWords.length < 12 && rawCasedWords.some(w => queryIndicators.has(w.toLowerCase()));
    const extractedFeatures = getFeatures(text, rawCasedWords, weights, isQuery, this.dynamicIdf, this.reverseAbbr);
    const featureCounts = {};
    for (const [token, w] of extractedFeatures) {
      if (!featureCounts[token]) featureCounts[token] = { weight: w, count: 0 };
      featureCounts[token].count += 1;
    }
    const rawVector = projectHash(featureCounts, this.dimension);
    return normalizeL2(rawVector);
  }

  getEmbedding(text) {
    return this._textToVector(text);
  }

  getEmbeddings(texts) {
    return texts.map(t => this._textToVector(t));
  }
}

module.exports = { Embedder };
