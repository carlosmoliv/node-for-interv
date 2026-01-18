// const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));
// const sleepImmediate = () => new Promise((resolve) => setImmediate(resolve));

// (async () => {
//   setImmediate(() => console.log('setImmediate'));
//   console.log('console.log');
//   await sleep(0);
//   setImmediate(() => console.log('setImmediate 2'));
//   await sleepImmediate();
//   setImmediate(() => console.log('setImmediate 3'));
//   console.log('console.log 2');
//   await 'await';
//   setImmediate(() => console.log('setImmediate 4'));
//   console.log('console.log 3');
// })();


setImmediate(() => console.log('setImmediate'))
console.log('console.log')
Promise.resolve()
  .then(() => setTimeout(() => {
    setImmediate(() => console.log('setImmediate 2'))
    Promise.resolve()
      .then(() => setImmediate(() => {
        setImmediate(() => console.log('setImmediate 3'))
        console.log('console.log 2')
        Promise.resolve()
          .then(() => {
            setImmediate(() => console.log('setImmediate 4'))
            console.log('console.log 3')
        })
      }))
  }))
