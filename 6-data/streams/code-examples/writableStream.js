const fs = require('node:fs');

const writeStream = fs.createWriteStream('example.txt');

writeStream.write('This is the first line\n');
writeStream.write('This is the second line\n');
writeStream.end('This is the last line\n');

writeStream.on('finish', () => {
  console.log('Finished writing to the file');
});

writeStream.on('error', (err) => {
  console.error('Error while writing to the file:', err);
});
