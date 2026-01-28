const { open } = require('node:fs/promises');

(async () => {
  const fileHandle = await open('text.txt', 'w');
  const stream = fileHandle.createWriteStream();

  console.time('timer');

  drainCount = 0;
  stream.on('finish', async () => {
    console.timeEnd('timer');
    console.log('Internal buffer was drained', drainCount, 'times');
    await fileHandle.close();
  });

  stream.on('drain', () => {
    drainCount++;
    write();
  });

  let writeCount = 0;
  function write() {
    for (let i = writeCount; i <= 1000000; i++) {
      if (i === 1000000) {
        return stream.end();
      }

      // If false is returned from stream.write()
      // further attempts to write data to the stream should stop until the 'drain' event is emitted.
      if (!stream.write(`${i}\n`)) {
        break;
      }

      writeCount++;
    }
  }
  write();
})();
