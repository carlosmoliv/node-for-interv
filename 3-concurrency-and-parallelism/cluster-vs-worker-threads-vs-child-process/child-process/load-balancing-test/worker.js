const express = require('express');

console.log(`[ WORKER ] process ${process.pid} started`);

const app = express();

app.get('/', (req, res) => {
  res.send(`[ WORKER ] process: ${process.pid} sent response`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`[ WORKER ] listening on ${PORT} from process: ${process.pid}`);
});
