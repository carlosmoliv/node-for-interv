const { Buffer } = require('node:buffer');

// Create an empty Buffer of a specific size
const buff = Buffer.alloc(4);
console.log(buff); // <Buffer 00 00 00 00>

buff.write('love', 'utf-8');
console.log(buff); // <Buffer 6c 6f 76 65>
