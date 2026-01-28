const { Duplex } = require('stream');

class EchoDuplexStream extends Duplex {
  _read() {}

  _write(chunk, encoding, callback) {
    this.push(chunk);
    callback();
  }
}

const echoStream = new EchoDuplexStream();

echoStream.write('Hello, world!\n');
echoStream.pipe(process.stdout);
