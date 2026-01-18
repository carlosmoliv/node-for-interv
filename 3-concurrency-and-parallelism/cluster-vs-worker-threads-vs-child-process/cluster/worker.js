const path = require('path');
const resizeImage = require('../util');

const workerId = require('cluster').worker.id;

// Each worker resizes the files it has been assigned
const files = JSON.parse(process.env.files);

console.log(`[ WORKER ] ( id: ${workerId} | process: ${process.pid} ) started`);
for (const file of files) {
  const imagePath = path.join(__dirname, '..', 'images', file);
  const newImageName = `resized_${file.replace('original', 'file_')}`;
  const newImagePath = path.join(__dirname, '..', 'images', newImageName);
  resizeImage(imagePath, newImagePath, 10);
}

console.log(
  `[ WORKER ] ( id: ${workerId} | process: ${process.pid} ) finished resizing ${files.length} images`,
);

// Terminate the worker once it finishes its work
process.exit(0);
