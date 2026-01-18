let obj = { a: 1 };
const iterations = 20;

let str, pos, res;

for (let i = 0; i < iterations; i++) {
  obj = { obj1: obj, obj2: obj }; // Doubles in size each iter
}

console.time('JSON.stringify');
str = JSON.stringify(obj);
console.timeEnd('JSON.stringify');

console.time('Pure indexOf');
pos = str.indexOf('nomatch');
console.timeEnd('Pure indexOf');

console.time('JSON.parse');
res = JSON.parse(str);
console.timeEnd('JSON.parse');
