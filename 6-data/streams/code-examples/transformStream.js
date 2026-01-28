const { Transform } = require('stream');
const fs = require('node:fs');

class UppercaseTransformStream extends Transform {
  _transform(chunk, encoding, callback) {
    const uppercasedChunk = chunk.toString().toUpperCase();
    this.push(uppercasedChunk);
    callback();
  }
}

const inputStream = fs.createReadStream('example.txt');
const outputStream = fs.createWriteStream('output.txt');

const uppercaseStream = new UppercaseTransformStream();

inputStream.pipe(uppercaseStream).pipe(outputStream);
