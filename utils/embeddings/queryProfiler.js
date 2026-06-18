function profileQuery(rawCasedWords) {
  const queryIndicators = new Set([
    'what', 'how', 'why', 'who', 'where', 'when', 'which', 'is', 'define', 'explain', 'search'
  ]);
  const isQuery = rawCasedWords.length < 12 && rawCasedWords.some(w => queryIndicators.has(w.toLowerCase()));
  return {
    unigram: isQuery ? 1.2 : 1.0,
    bigram: isQuery ? 1.5 : 1.0,
    acronym: isQuery ? 2.0 : 1.5,
    subword_ngram: isQuery ? 0.15 : 0.30,
    typo_boundary: isQuery ? 0.15 : 0.30,
    decompound: isQuery ? 0.8 : 0.6
  };
}

module.exports = { profileQuery };
