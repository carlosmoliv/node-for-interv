const { fork } = require('child_process');
const path = require('path');

console.log(`[ MAIN ] process ${process.pid} is running`);

const worker1 = fork(path.join(__dirname, 'worker.js'));
const worker2 = fork(path.join(__dirname, 'worker.js'));

worker1.on('exit', () => {
  console.log(`[ MAIN ] process ${worker1.pid} died`);
});

worker2.on('exit', () => {
  console.log(`[ MAIN ] process ${worker2.pid} died`);
});
