const { fork } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const timeStart = Date.now();
console.log(`[ MAIN ] ( process: ${process.pid} ) is running`);

const files = fs
  .readdirSync(path.join(__dirname, '..', 'images'))
  .filter((file) => file.includes('original'));
const numCPUs = os.cpus().length;
const filesPerWorker = Math.ceil(files.length / numCPUs);
let activeWorkers = Math.min(numCPUs, files.length);

for (let i = 0; i < activeWorkers; i++) {
  const start = i * filesPerWorker;
  const end = start + filesPerWorker;
  const workerFiles = files.slice(start, end);

  // Fork the worker process
  const child = fork(path.join(__dirname, 'worker.js'), [JSON.stringify(workerFiles)]);

  child.on('message', (message) => {
    if (message === 'done') {
      activeWorkers--;
      if (activeWorkers === 0) {
        console.log('all workers have finished. Exiting main thread...');
        console.log(`milliseconds taken to complete task: ${Date.now() - timeStart}`);
        process.exit(0);
      }
    }
  });
}
