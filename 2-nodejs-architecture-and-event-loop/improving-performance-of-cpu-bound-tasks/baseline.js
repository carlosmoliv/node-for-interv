const { countElements, createLargerArray } = require('./util');

const largerArray = createLargerArray();
const noMPStart = Date.now();
const count = countElements(largerArray);

console.log(
  `Counted ${new Intl.NumberFormat().format(count)} items in ${
    Date.now() - noMPStart
  } miliseconds`,
);
