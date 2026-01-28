const fs = require('fs');

const readStream = fs.createReadStream('largeFile.txt', 'utf8');

let data = ''; // data as utf8 string

readStream.on('data', (chunk) => {
  data += chunk;
  const currentChunkSizeInMb = chunk.length / 1024 / 1024;
  const currentDataSizeInMb = data.length / 1024 / 1024;
  console.log(
    `Received ${currentChunkSizeInMb} MB of data. Current data size: ${currentDataSizeInMb.toFixed(
      2,
    )} MB`,
  );
});

readStream.on('end', () => {
  console.log('Finished reading the file');
});

readStream.on('error', (err) => {
  console.error('Error while reading the file:', err);
});
