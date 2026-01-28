const { createReadStream } = require('node:fs');

const readableStream = createReadStream('./image.png');

readableStream.on('data', (chunk) => {
  console.log(chunk);

  // Close the stream right away to release resources
  readableStream.close();
});
