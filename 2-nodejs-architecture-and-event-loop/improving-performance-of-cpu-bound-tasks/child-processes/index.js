const { fork } = require('child_process');
const { createLargerArray } = require('../util');
const path = require('path');
const dirPath = path.resolve(__dirname);

const largerArray = createLargerArray();

// Main thread
const taskStart = new Date();
const child = fork(path.join(dirPath, './child.js'));
console.log(`Child process initiated in ${Date.now() - taskStart} miliseconds`);

child.send(largerArray);

console.log(
  `Main thread is accessible for the rest of the application after ${
    Date.now() - taskStart
  } miliseconds`,
);

child.on('message', (count) => {
  console.log(
    `Counted ${new Intl.NumberFormat().format(count)} in ${
      Date.now() - taskStart
    } miliseconds`,
  );

  child.kill();
});
