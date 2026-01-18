const start = Date.now();
let j = 0;

for (let i = 0; i < 10000000000; i++) {
  j += 1;
}
console.log(`That simple loop took ${Date.now() - start} miliseconds to complete`);

console.log('Until the previous task completes, the application is unresponsive.');
