const fs = require('fs')

// This console.log gets pushed to the Call Stack
// It is executed and start is printed to the console
// The function then is popped off the Call Stack
console.log('start')

// Next, this promise gets pushed onto the call stack because it resolves immediately
// Its callback is scheduled in the Promise.resolve Microtask Queue
// This queue of callbacks will execute one by one before the first iteration of the event loop
// Note: the Event Loop has not started yet, were still just scheduling callbacks in the relevant queues
// Now the Promise.resolve callbacks gets popped off the Call Stack
Promise.resolve().then(() => console.log('promise'))

// now, this fs.readFile gets pushed onto the Call Stack where is executed
// and the I/O operation sent to the Libuv thread pool
// The callback of this operation gets scheduled to run in the Poll phase, during the upcoming first iteration of the Event Loop
// Then the fs.readFile function is popped off the Call Stack
fs.readFile(__filename, () => {
  console.log('readFile console.log')
});

// FInally, this console.log gets pushed to the Call Stack, gets executed and end is printed to the console
// The function then is popped off the Call Stack
console.log('end')

// After all the operations the Call Stack is empty
// The entire file has been interpreted

// Node.js will now check if there are any callbacks scheduled in either the macro or microtask queues
// In this example, there are 2 callbacks scheduled
// The Microtask queue always has priority over any macro phase of the Event Loop
// Basically, Microtasks are executed before Macrotasks

// Now, the first and only callback in the promises Microtask
// gets popped off the queue and pushed on to the Call Stack
// it is executed immediately printing 'promise' to the console
// and then popped off the Call Stack
// After this, the Microtask queue is empty

// not, the only remaining callback is the Microtask scheduled in the POLL phase
// Same process happens:
// The callback is popped off the Poll queue and pushed onto the Call Stack
// It is executed printing 'readFile console.log' to the console
// and then popped off the Call Stack
// After this, the Poll queue is empty

// NOTES:
// The two console.logs are executed first because they're being executed by the node interpreter