const cluster = require('cluster');

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    console.log(`Process ${process.pid} received request`);
    res.send(`Process: ${process.pid} sent response`);
  });

  app.get('/kill', (req, res) => {
    const currentProcessPid = process.pid;
    console.log(`Exiting process: ${currentProcessPid}`);
    process.exit(1);
  });

  const PORT = 3000;
  app.listen(3000, () => {
    console.log(`Listening on ${PORT} from process: ${process.pid}`);
  });
}
