const { Worker, threadId } = require('worker_threads');
const fs = require('fs');
const path = require('path');
const os = require('os');

const timeStart = Date.now();
const workingDir = path.resolve(__dirname);

console.log(`[ MAIN ] ( process: ${process.pid} | thread: ${threadId} ) is running`);

// Get the names of image files in the directory
const files = fs
  .readdirSync(path.join(__dirname, '..', 'images'))
  .filter((file) => file.includes('original'));
const numCPUs = os.cpus().length; // number of logical cores

// Decide on worker count and load allocation
const filesPerWorker = Math.ceil(files.length / numCPUs); // number of files per L core
let activeWorkers = Math.min(numCPUs, files.length); // at least one file per worker

// Divide the files between the workers
for (let i = 0; i < activeWorkers; i++) {
  const currentBatchStart = i * filesPerWorker;
  const currentBatchEnd = currentBatchStart + filesPerWorker;
  const workerFiles = files.slice(currentBatchStart, currentBatchEnd);

  const worker = new Worker(path.join(workingDir, './worker.js'), {
    workerData: {
      files: workerFiles,
      id: i + 1,
    },
  });

  // attach "on message" callbacks to each worker
  // they will be kept in closure once loop exits
  worker.on('message', (message) => {
    console.log(
      `[ MAIN ] received message from worker ( thread: ${worker.threadId} ) : ${message}`,
    );
    if (message.includes('done')) {
      activeWorkers--; // decrease worker count when they exit

      if (activeWorkers === 0) {
        console.log('[ MAIN ] all workers have finished. Exiting main thread...');
        console.log(
          `[ MAIN ] miliseconds taken to complete task: ${Date.now() - timeStart}`,
        );
        process.exit(0);
      }
    }
  });
}
