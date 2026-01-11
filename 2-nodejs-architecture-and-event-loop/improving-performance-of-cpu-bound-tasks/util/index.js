// No multiprocessing example
function countElements(array) {
  return array.reduce((acc, val) => acc + (val === 'a' ? 1 : 0), 0);
}

function createLargerArray() {
  const largeArray = Array(1e7).fill('a'); // Example large array
  const largerArray = largeArray
    .concat(largeArray)
    .concat(largeArray)
    .concat(largeArray)
    .concat(largeArray);

  return largerArray;
}

module.exports = {
  countElements,
  createLargerArray,
};
