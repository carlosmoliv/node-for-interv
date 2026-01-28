// Create a Buffer with UTF16LE encoded data
// UTF16LE (Little Endian) is better for non-ASCII languages e.g. Chinese
// + used by many Windows applications
const utf16Buff = Buffer.from('love', 'utf16le');

console.log(utf16Buff);

// Convert the Buffer to a string with UTF16LE encoding
const utf16String = utf16Buff.toString('utf16le');

console.log(utf16String);
