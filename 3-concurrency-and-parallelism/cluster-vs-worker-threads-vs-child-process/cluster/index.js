const cluster = require('cluster');
const numCPUs = require('os').cpus().length; // logical threads
const fs = require('fs');
const path = require('path');

const timeStart = Date.now();
console.log(`[ MAIN ] ( process: ${process.pid} ) is running`);

// Get the names of image files in the directory
const files = fs
  .readdirSync(path.join(__dirname, '..', 'images'))
  .filter((file) => file.includes('original'));

// Divide the files between the workers
const filesPerWorker = Math.ceil(files.length / numCPUs);

// Track the number of active workers
let activeWorkers = Math.min(numCPUs, files.length);

// Fork workers and assign each a portion of the files
for (let i = 0; i < activeWorkers; i++) {
  const start = i * filesPerWorker;
  const end = start + filesPerWorker;
  const workerFiles = files.slice(start, end);

  cluster.setupPrimary({
    exec: path.join(__dirname, 'worker.js'),
  });
  cluster.fork({ files: JSON.stringify(workerFiles) });
}

cluster.on('exit', (worker) => {
  console.log(`[ MAIN ] worker ( process: ${worker.process.pid} ) exited`);

  // Decrement the number of active workers
  activeWorkers--;

  // If all workers have exited, terminate the master process
  if (activeWorkers === 0) {
    console.log('[ MAIN ] all workers have finished. Terminating [ MAIN ] process...');
    console.log(
      `[ MAIN ] miliseconds taken to complete the entire task: ${Date.now() - timeStart}`,
    );
    process.exit(0);
  }
});
