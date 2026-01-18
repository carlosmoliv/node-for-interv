const cluster = require('cluster');

// checking if this script was called from the main thread
if (cluster.isMaster) {
  // if yes fork this code. Create a child process
  // there are going to be 2 express app processes
  cluster.fork();
  cluster.fork();
} else {
  // child process
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    console.log(`Process ${process.pid} received request`);
    res.send(`Process: ${process.pid} sent response`);
  });

  const PORT = 3000;
  app.listen(3000, () => {
    console.log(`Listening on ${PORT} from process: ${process.pid}`);
  });
}
