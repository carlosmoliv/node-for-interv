const fs = require('node:fs/promises');

(async () => {
  const file = await fs.open('text.txt', 'w');
  const stream = file.createWriteStream();

  console.time('timer');

  const numberOfWrites = 10000000;

  let i = 0;
  function doWriting() {
    while (i < numberOfWrites) {
      const data = `The current number is: ${i}, awaiting the next number to save\n`;

      if (i === numberOfWrites - 1) {
        return stream.end(data);
      }

      if (!stream.write(data)) break;

      i++;
    }
  }
  doWriting();

  stream.on('drain', () => {
    doWriting();
  });

  stream.on('finish', () => {
    console.log(
      'Memory used to write data:',
      (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
      'MB',
    );
    console.timeEnd('timer');
    file.close();
  });
})();
