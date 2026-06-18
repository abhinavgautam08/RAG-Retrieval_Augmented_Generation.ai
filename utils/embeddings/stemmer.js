function stemWord(word) {
  if (word.length <= 3) return word;
  const suffixes = [
    ['sses', 'ss'], ['ies', 'i'], ['tional', 'tion'], ['ational', 'ate'],
    ['izer', 'ize'], ['alli', 'al'], ['entli', 'ent'], ['eli', 'e'],
    ['ousli', 'ous'], ['alism', 'al'], ['ation', 'ate'], ['aliti', 'al'],
    ['iviti', 'ive'], ['biliti', 'ble'], ['ative', ''], ['icate', 'ic'],
    ['alise', 'al'], ['iciti', 'ic'], ['ical', 'ic'], ['ful', ''],
    ['nes', ''], ['ing', ''], ['ment', ''], ['able', ''], ['ible', ''],
    ['ness', ''], ['ion', ''], ['ive', ''], ['ize', ''], ['ly', ''],
    ['ed', ''], ['es', ''], ['s', '']
  ];
  let prev = '';
  while (word !== prev) {
    prev = word;
    for (const [suffix, replacement] of suffixes) {
      if (word.endsWith(suffix)) {
        const stem = word.slice(0, -suffix.length) + replacement;
        if (stem.length >= 3) {
          word = stem;
          break;
        }
        break;
      }
    }
  }
  return word;
}

module.exports = { stemWord };
