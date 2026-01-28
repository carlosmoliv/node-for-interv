const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  const fileSize = data.length / 1024 / 1024;
  console.log(`Read file size: ${fileSize} MB`);
});
