const fs = require('node:fs/promises');

(async () => {
  console.time('pipingTimer');
  const srcFile = await fs.open('eightHundredMBfile.txt', 'r');
  const destFile = await fs.open('copy.txt', 'w');

  const readableStream = srcFile.createReadStream();
  const writableStream = destFile.createWriteStream();

  readableStream.pipe(writableStream);

  writableStream.on('finish', () => {
    console.timeEnd('pipingTimer');
  });
})();
