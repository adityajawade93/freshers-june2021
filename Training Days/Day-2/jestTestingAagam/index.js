const { fibonacci } = require('./fibonacci');
const { printRepeating } = require('./duplicate');

console.log(fibonacci(0));

console.log(fibonacci(1));

console.log(fibonacci(2));

console.log(fibonacci(3));

console.log(fibonacci(4));

console.log(fibonacci(5));

console.log(fibonacci(6));
// const arr = [1, 3, 5, 7, 8, 9];
// let x = 5;

// if (recursiveFunction(arr, x, 0, arr.length - 1))
//     console.log(x + ' found');
// else
//     console.log(x + ' not found');

// x = 6;

// if (recursiveFunction(arr, x, 0, arr.length - 1))
//     console.log(x + ' found');
// else
//     console.log(x + ' not found');

let arr = [ 1, 2, 3, 1, 3, 6, 6 ]
// arr = 6
console.log(printRepeating(arr))
// console.log(typeof(arr))