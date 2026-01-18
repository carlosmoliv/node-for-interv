const { parentPort, threadId, workerData } = require('worker_threads');
const path = require('path');
const resizeImage = require('../util');

const timeStart = Date.now();
const { files, id } = workerData;

console.log(
  `[ WORKER ] ( id: ${id} | process: ${process.pid}) | thread: ${threadId} ) started`,
);

for (const file of files) {
  const imagePath = path.join(__dirname, '..', 'images', file);
  const newImageName = `resized_${file.replace('original', 'file_')}`;
  const newImagePath = path.join(__dirname, '..', 'images', newImageName);
  resizeImage(imagePath, newImagePath, 10);
}

console.log(
  `[ WORKER ] ( id: ${id} | process: ${process.pid}) | thread: ${threadId} ) finished resizing ${files.length} images`,
);

// Send message to main thread when finished
parentPort.postMessage(`done in ${Date.now() - timeStart}ms`);
