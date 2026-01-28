const fs = require('node:fs');

const rStream = fs.createReadStream('text.txt');
const wStream = fs.createWriteStream('to.txt');

console.log('readableStream highWaterMark:', rStream.readableHighWaterMark);
console.log('writableStream highWaterMark:', wStream.writableHighWaterMark);
