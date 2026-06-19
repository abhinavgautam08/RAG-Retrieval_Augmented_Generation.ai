const { hashToken } = require('./hash');

function projectHash(featureCounts, dimension = 384) {
  const vector = new Array(dimension).fill(0.0);
  for (const [token, info] of Object.entries(featureCounts)) {
    const tfMultiplier = 1.0 + Math.log(info.count);
    const effectiveWeight = info.weight * tfMultiplier;
    const h1 = hashToken(token, 12345);
    const idx1 = h1 % dimension;
    const sign1 = (h1 & 1) ? 1 : -1;
    vector[idx1] += sign1 * effectiveWeight;
    const h2 = hashToken(token, 67890);
    const idx2 = h2 % dimension;
    const sign2 = (h2 & 1) ? 1 : -1;
    vector[idx2] += sign2 * effectiveWeight * 0.5;
    const h3 = hashToken(token, 13579);
    const idx3 = h3 % dimension;
    const sign3 = (h3 & 1) ? 1 : -1;
    vector[idx3] += sign3 * effectiveWeight * 0.25;
  }
  return vector;
}

module.exports = { projectHash };
