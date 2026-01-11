const { Worker, isMainThread, parentPort } = require('worker_threads');
const { countElements, createLargerArray } = require('../util');

if (isMainThread) {
  // This code is executed in the main thread and not in the worker.

  // Create an array with huge amount of values
  const arr = createLargerArray();

  const taskStart = new Date();
  const worker = new Worker(__filename);
  console.log(`new Worker initiated in ${Date.now() - taskStart} miliseconds`);

  // Send array to the worker thread
  worker.postMessage(arr);

  worker.once('message', (count) => {
    console.log(
      `Counted ${new Intl.NumberFormat().format(count)} items in: ${
        Date.now() - taskStart
      } miliseconds`,
    );
  });

  console.log(
    `Main thread is accessible for the rest of the application after ${
      Date.now() - taskStart
    } miliseconds`,
  );
} else {
  // This code is executed in the worker and not in the main thread.
  if (parentPort) {
    parentPort.once('message', (arr) => {
      const processingStart = Date.now();

      const count = countElements(arr);

      console.log(`Processing completed in ${Date.now() - processingStart} miliseconds`);

      parentPort.postMessage(count);
    });
  }
}
