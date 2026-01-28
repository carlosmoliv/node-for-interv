const { pipeline } = require('node:stream');
const fs = require('node:fs');

(async () => {
  console.time('pipelineTimer');
  const readableStream = fs.createReadStream('from.txt');
  const writableStream = fs.createWriteStream('to.txt');

  pipeline(readableStream, writableStream, (error) => {
    if (error) {
      console.error(`data pipeline error: ${error.message}`);
    } else {
      console.timeEnd('pipelineTimer');
      console.log('data pipeline finished successfully');
    }
  });
})();
