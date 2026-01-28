const express = require('express');
const fs = require('node:fs');

const app = express();

const videoPath = 'test-video.mp4';
const videoByteLength = fs.statSync(videoPath).size; // just like array.length this gives you number of bytes

// serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// HTTP HEAD request handler providing video metadata
app.head('/video', (req, res) => {
  const headers = {
    'Accept-Ranges': 'bytes',
    'Content-Length': videoByteLength,
    'Content-Type': 'video/mp4',
  };

  res.writeHead(200, headers);
  res.send();
});

app.get('/video', (req, res) => {
  const range = req.headers.range;
  if (!range) return res.status(400).send('range header required');

  const chunkLength = 1024 * 1024; // megabyte
  const startByte = Number(range.replace(/\D/g, ''));
  const endByte = Math.min(startByte + chunkLength, videoByteLength - 1); // -1 to account for 0-indexed video byte length

  const contentLength = endByte - startByte + 1; // +1 to account for start and end bytes being 0-indexed
  const headers = {
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Range': `bytes ${startByte}-${endByte}/${videoByteLength}`,
    'Content-Type': 'video/mp4',
  };

  res.writeHead(206, headers);
  const readableStream = fs.createReadStream(videoPath, {
    start: startByte,
    end: endByte,
  });

  readableStream.pipe(res);
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});
