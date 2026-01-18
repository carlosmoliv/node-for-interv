const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);

  worker.on('message', (message) => {
    console.log(`Received message from worker: ${message}`);

    const workerTerminationStart = Date.now();
    console.log('Terminating the worker...');
    worker
      .terminate()
      .then(() =>
        console.log(
          `Worker terminated after ${Date.now() - workerTerminationStart} miliseconds`,
        ),
      );
  });

  worker.postMessage('start'); // this line initiates the calculation

  // while the calculation is running the main programme can continue
  console.log('Main thread is accessible for the rest of the application.');
} else {
  parentPort.on('message', (message) => {
    // Delegate the CPU-intensive task to a worker thread
    const start = Date.now();

    let importantNumber = 0;
    for (let i = 0; i < 10000000000; i++) {
      importantNumber += 1;
    }

    console.log(`Task completed after ${Date.now() - start} miliseconds`);
    parentPort.postMessage(`${new Intl.NumberFormat().format(importantNumber)}`);
  });
}
