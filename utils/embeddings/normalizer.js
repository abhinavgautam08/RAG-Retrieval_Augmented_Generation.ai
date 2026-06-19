function normalizeL2(vector) {
  let sqSum = 0;
  for (let i = 0; i < vector.length; i++) {
    sqSum += vector[i] * vector[i];
  }
  if (sqSum > 0) {
    const norm = Math.sqrt(sqSum);
    for (let i = 0; i < vector.length; i++) {
      vector[i] /= norm;
    }
  }
  return vector;
}

module.exports = { normalizeL2 };
