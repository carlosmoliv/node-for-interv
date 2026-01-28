const { closeSync, openSync, writeSync } = require('node:fs');

const fileDescriptor = openSync('text.txt', 'w');
console.time('timer');

for (let i = 1; i <= 1000000; i++) {
  writeSync(fileDescriptor, `${i}\n`);
}

closeSync(fileDescriptor);
console.timeEnd('timer');
