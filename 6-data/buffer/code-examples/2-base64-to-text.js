// SEND
const buff = Buffer.from('love');

// encode the buffer into a base64 string
// great for sending binary data (image, video, audio)
// over HTTP or EMAIL protocols
const base64String = buff.toString('base64');
console.log(base64String); // bG92ZQ==

// RECEIVE
// create a buffer with base64 encoding
const base64buff = Buffer.from(base64String, 'base64');
console.log(base64buff); // <Buffer 62 47 39 32 5a 51 3d 3d>

// encode the buffer into a string
const string = base64buff.toString('ascii');
console.log(string); // love
