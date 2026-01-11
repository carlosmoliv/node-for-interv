const fs = require('fs');

// before the Event Loop even starts this console.log will be executed synchronously
console.log('start');

// Then setTimeout adds its callback to the queue for timers phase 
// for the next or first iteration of the Event Loop
setTimeout(() => console.log('setTimeout 1'), 0);

// setImmediate runs and schedules its callback in the check phase
// for the first iteration of the Event Loop
setImmediate(() => console.log('setImmediate'));

// Then the fs.readFile starts reading the file and registers its callback ofr I/O operation
// Doesn't run the code inside the callback yet
// It will do so only when the I/O operation is completed, during the poll phase
// Again, in the next iteration of the Event Loop
fs.readFile(__filename, () => {
  setTimeout(() => console.log('readFile setTimeout'), 0);
  setImmediate(() => console.log('readFile setImmediate'));
  process.nextTick(() => console.log('readFile nextTick'));
});

// Then this promise is resolve and its callback is triggered and registered in the promise microtask queue
Promise.resolve().then(() => {
  console.log('Promise');
  process.nextTick(() => console.log('Promise nextTick'));
});

// process.nextTick registers its callback to the next tick Microtask queue
process.nextTick(() => console.log('nextTick'));

// Then another setTimeout registers its callback to be run after 0 ms in the timers phase
setTimeout(() => console.log('setTimeout 2'), 0);

// Finally this console.log is executed synchronously before the Event Loop starts
console.log('end');

// ------------------------------ CONCLUSION OF THE INITIALIZATION PHASE ------------------------------------------------------------
// i.e., the entire file has been interpreted, requiring modules, registering callbacks for events, and running the synchronous code
// The state of the Event Loop, phase queues and micro queues at this point is as follows:
// Call Stack: empty
// Timers phase queue: ['setTimeout 1' callback, 'setTimeout 2' callback]
// Pending Callbacks phase queue: []
// Poll phase queue: [fs.readFile callback]
// Check phase queue: ['setImmediate' callback]
// Close Callbacks phase queue: []
// nextTick Microtask queue: ['nextTick' callback]
// Promise Microtask queue: [Promise.resolve() callback]
// ----------------------------------------------------------------------------------------------------------------------------------

// NEXT THE CONTEXT STARTS EVALUATING RESPECTIVE QUEUES
// As always, before touching macro tasks, micro task queues are checked first

// So first the process.nextTick Microtask queue is evaluated
// There's a Callback there, scheduled by line 31 which has a simple console.log
// So nextTick is printed
// This callback is then popped off the process.nextTick() Microtask queue

// Next, the Promise Microtask queue is evaluated
// There's one callback there from line 26
// console.log 'Promise' is called directly, therefore 'Promise' is printed
// Line 27 process.nextTick() callback gets executed and adds its callback to the process.nextTick Microtask queue

// NOTE: You might think "there is a new callback there now at line 27, and Microtask queues always take priority over Macrotask queues, so why isn't it executed now?"
// Explanation:
// In Node.js, microtasks are split into two separate queues:
// the process.nextTick queue and the Promise microtask queue.
//
// When Node.js starts executing microtasks, it fully drains
// one queue at a time and does not switch queues mid-drain.
//
// While executing the Promise microtask, a new process.nextTick
// callback is scheduled. However, it is not executed immediately
// because Node.js is still draining the Promise microtask queue.
//
// Only after the Promise microtask queue is completely empty
// does Node.js check the microtask queues again.
// At that point, it finds the newly added callback in the
// process.nextTick queue and executes it.
//
// Therefore, 'Promise nextTick' is printed after 'Promise',
// and only once the current Promise microtask queue has finished.

//---------------------------------- THIS CONCLUDES RUNNING OF THE PROMISES MICROTASK QUEUE -------------------------------------------

// Now, the Event Loop starts its first iteration with the timers phase
// Here are two callbacks which were scheduled to run no sooner than after 0 ms
// so they can be fired immediately in the order theyre were queued -> 'setTimeout 1' is printed first, then 'setTimeout 2' is printed
// Both callbacks are then popped off the timers phase queue

// No more timers enqueued so the loop checks for any Microtasks
// there are none, so it proceeds to the pending queue, which is empty

// Again the microtask queues are checked for callbacks, none are found
// So the Event Loop proceeds to the poll phase, which has a callback from the fs.readFile operation registered
// I/O event was received so the callback gets executed
// Neither line 19 nor line 20 is executed directly though, so the callbacks are registered in their respective phase queues
// setTimeout callback is registered in the timers phase queue
// setImmediate callback is registered in the check phase queue
// and the process.nextTick callback is registered in the nextTick Microtask queue
// No more I/O events ------------------------------------------------------------------------------------------------------------------

// There is a callback scheduled in the nextTick Microtask queue,and microtasks are executed between phases
// however, the POLL PHASE is special in the way it can transition directly to the check phase if there
// are scripts schedule by setImmediate() 
// So the Event Loop moves on to the CHECK PHASE directly 
// where it executes the only callback they're registered for this iteration of the Event Loop, logging 'setImmediate'
// Once CHECKED is completed, the normal service is resumed

// A PHASE ENDED SO MICROTASK QUEUES ARE CHECKED AGAIN
// console.log from line 21 is executed, logging 'readFile nextTick'

// Back to Macrotasks, queue for CLOSED CALLBACKS phase is empty

// END OF FIRST ITERATION OF THE EVENT LOOP -------------------------------------------------------------------------------------------

// Next iteration
// 2 remaining callbacks: setTimeout and setImmediate from the fs.readFile callback
// setImmediate is intended to execute a script as soon as the current POLL PHASE phase finishes
// setTimeout schedules a script to run after a specified minimum delay in milliseconds has passed
// The execution order of those timers can vary depending on the context in which are invoked
// If both are called from the main modulem,  the timing will be influenced bt the perfomance of the process, 
// wich can be affected by other applications running on the system \

// When the 2 calls occur within an I/O cycle, such  as within fs.readFile callback,
// setImmediate is always executed FIRST when scheduled within an I/O cycle, regarding of the numbers of timers present
// Now, setTimeout callback is executed, logging 'readFile setTimeout'