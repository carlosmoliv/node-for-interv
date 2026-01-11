const { countElements } = require('../util');

process.on('message', (data) => {
  // This will be our CPU-bound task
  const processingStart = Date.now();

  const result = countElements(data);

  console.log(`Processing completed in ${Date.now() - processingStart} miliseconds`);

  process.send(result);
});
