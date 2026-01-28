const { createReadStream } = require('node:fs');

(async () => {
  const stream = createReadStream('./BigFIle.txt');

  stream.on('error', (error) => {
    console.log('received an error: ', error.message);
  });

  stream.on('close', () => {
    console.log('the stream was correctly closed');
  });

  stream.on('final', () => {
    console.log('the final chunk of data was received');
  });

  stream.on('destroy', () => {
    console.log('the stream emitted a destroy event');
  });

  stream.on('data', (chunk) => {
    console.log('chunk');
    stream.emit('error', new Error('this is a contrived error which will be emitted'));
  });

  stream.on('end', () => {
    console.log('the stream reached its end');
  });
})();
