const cluster = require('cluster');
const fs = require('fs');
const http = require('http');

// util function to decode base64 into an image
function base64ToImage(data) {
  const binaryData = Buffer.from(data, 'base64');

  fs.writeFileSync('./receivedImage.png', binaryData);
  console.log(`Wrote ${(binaryData.length / 1024 / 1024).toFixed(2)} MB file to disk`);
}

// http server which will receive base64 string over the http protocol
function server() {
  return http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/upload') {
      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', () => {
        base64ToImage(data);

        res.statusCode = 200;
        res.end('Data received and processed.');

        process.exit(1);
      });
    }
  });
}

// launching two processes to send base64 data and listen for it with cluster mode
if (cluster.isMaster) {
  cluster.fork();

  server().listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
} else {
  const buff = fs.readFileSync('./image.png');
  const base64Data = buff.toString('base64');

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': 'attachment',
    },
  };

  const req = http.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
      responseData += chunk;
    });
    res.on('end', () => {
      console.log(`Received response: ${responseData}`);
    });
  });

  req.write(base64Data);
  req.end();
}
