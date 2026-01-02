const fs = require('fs');

console.log('start');

setTimeout(() => console.log('setTimeout 1'), 0);
setImmediate(() => console.log('setImmediate'));

fs.readFile(__filename, () => {
  setTimeout(() => console.log('readFile setTimeout'), 0);
  setImmediate(() => console.log('readFile setImmediate'));
  process.nextTick(() => console.log('readFile nextTick'));
});

Promise.resolve().then(() => {
  console.log('Promise');
  process.nextTick(() => console.log('Promise nextTick'));
});

process.nextTick(() => console.log('nextTick'));
setTimeout(() => console.log('setTimeout 2'), 0);

console.log('end');
