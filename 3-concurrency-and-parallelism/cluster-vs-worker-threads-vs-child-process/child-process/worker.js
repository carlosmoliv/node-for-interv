const path = require('path');
const resizeImage = require('../util');

const files = JSON.parse(process.argv[2]);
console.log(`[ WORKER ] ( process: ${process.pid} ) started`);

for (const file of files) {
  const imagePath = path.join(__dirname, '..', 'images', file);
  const newImageName = `resized_${file.replace('original', 'file_')}`;
  const newImagePath = path.join(__dirname, '..', 'images', newImageName);
  resizeImage(imagePath, newImagePath, 10);
}

console.log(
  `[ WORKER ] ( process: ${process.pid} ) finished resizing ${files.length} images`,
);
process.send('done'); // Notify the parent process that the work is done
