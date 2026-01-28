const fs = require('node:fs/promises');

(async () => {
  const file = await fs.open('text.txt', 'w');
  const stream = file.createWriteStream();

  console.time('timer');

  for (let i = 1; i <= 10000000; i++) {
    stream.write(`The current number is: ${i}, awaiting the next number to save\n`);
  }
  console.log(
    'Memory used to write data:',
    (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
    'MB',
  );

  console.timeEnd('timer');
})();
