const fs = require('fs');

const fileSizeInBytes = 5 * 1024 * 1024; // 5MB
const randomContent = 'x'; // Character to be repeated

// Generate random content by repeating the character
const content = randomContent.repeat(fileSizeInBytes);

// Specify the file name
const fileName = 'largeFile.txt';

// Write the content to the file
fs.writeFileSync(fileName, content, 'utf8');

console.log(`File "${fileName}" with random content has been created.`);
