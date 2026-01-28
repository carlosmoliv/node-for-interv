const { Readable } = require('node:stream');
const fs = require('node:fs');

class CustomReadableStream extends Readable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });

    this.fileName = fileName;
    this.fd = null; // file descriptor
  }

  _construct(callback) {
    fs.open(this.fileName, 'r', (err, fd) => {
      if (err) return callback(err);
      this.fd = fd;
      callback();
    });
  }

  // size argument is a number representing the highWaterMark
  _read(size) {
    const buff = Buffer.alloc(size);
    fs.read(this.fd, buff, 0, size, null, (err, bytesRead) => {
      if (err) return this.destroy(err);

      // this line is responsible for pushing data into internal buffer
      // buff.subarray is going to ensure we are pushing only actual data
      // without any empty bytes
      // null will have meant there is no more data - end of the stream
      this.push(bytesRead > 0 ? buff.subarray(0, bytesRead) : null);
    });
  }
}

const stream = new CustomReadableStream({ highWaterMark: 100, fileName: 'read.txt' });

stream.on('data', (chunk) => {
  if (chunk instanceof Buffer) {
    console.log(chunk.toString());
  }
});

stream.on('end', () => {
  console.log('end of reading the stream');
});
