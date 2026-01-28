const fs = require('node:fs');

const readStream = fs.createReadStream('example.txt', 'utf8');

readStream.on('data', (chunk) => {
  console.log('Received chunk:\n', chunk);
});

readStream.on('end', () => {
  console.log('Finished reading the file');
});

readStream.on('error', (err) => {
  console.error('Error while reading the file:', err);
});
