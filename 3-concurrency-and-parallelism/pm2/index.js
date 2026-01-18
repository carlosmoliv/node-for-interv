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
