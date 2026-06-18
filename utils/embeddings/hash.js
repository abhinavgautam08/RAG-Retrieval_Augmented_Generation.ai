function hashToken(token, seed = 0) {
  let h = (2166136261 ^ seed) >>> 0;
  for (let i = 0; i < token.length; i++) {
    h = Math.imul(h ^ token.charCodeAt(i), 16777619) >>> 0;
  }
  return h;
}

module.exports = { hashToken };
