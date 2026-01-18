module.exports = (function workerDoesWork() {
  return setInterval(() => {
    const environment = process.env.NODE_ENV;
    console.log(`Doing some work every 2 seconds in ${environment} env.`);
  }, 2000);
})();
