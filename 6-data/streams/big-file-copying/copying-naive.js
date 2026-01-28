const fs = require('node:fs/promises');

(async () => {
  const fileHandleRead = await fs.open('from.txt', 'r');
  const fileHandleWrite = await fs.open('to.txt', 'w');

  const readStream = fileHandleRead.createReadStream();
  const writeStream = fileHandleWrite.createWriteStream();

  readStream.on('data', (chunk) => {
    console.log((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2), 'MB used');
    writeStream.write(chunk);
  });
})();
