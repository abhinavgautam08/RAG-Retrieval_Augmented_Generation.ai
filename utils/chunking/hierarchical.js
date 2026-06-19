const { chunkText } = require('./slidingWindow');

function chunkTextHierarchical(text, parentSize = 1500, parentOverlap = 300, childSize = 500, childOverlap = 100) {
  if (parentSize <= 0) parentSize = 1500;
  if (parentOverlap < 0) parentOverlap = 0;
  if (parentOverlap >= parentSize) parentOverlap = Math.floor(parentSize / 2);
  if (childSize <= 0) childSize = 500;
  if (childOverlap < 0) childOverlap = 0;
  if (childOverlap >= childSize) childOverlap = Math.floor(childSize / 2);

  const parentChunks = chunkText(text, parentSize, parentOverlap);
  const hierarchicalChunks = [];
  for (const parent of parentChunks) {
    const children = chunkText(parent, childSize, childOverlap);
    for (const child of children) {
      hierarchicalChunks.push({
        child_text: child,
        parent_text: parent
      });
    }
  }
  return hierarchicalChunks;
}

module.exports = { chunkTextHierarchical };
