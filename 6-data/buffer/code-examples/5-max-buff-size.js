const { constants } = require('buffer');

// check max buffer size on your platform
console.log(constants.MAX_LENGTH / 1024 / 1024 / 1024, 'GB');
