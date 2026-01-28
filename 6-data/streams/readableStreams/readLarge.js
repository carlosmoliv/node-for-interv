const fs = require('node:fs/promises');

(async () => {
  const fileHandleRead = await fs.open('from.txt', 'r');
  const fileHandleWrite = await fs.open('to.txt', 'w');

  const readStream = fileHandleRead.createReadStream();
  const writeStream = fileHandleWrite.createWriteStream();

  readStream.on('data', (chunk) => {
    if (!writeStream.write(chunk)) {
      readStream.pause();
    }
  });

  writeStream.on('drain', () => {
    readStream.resume();
  });
})();
