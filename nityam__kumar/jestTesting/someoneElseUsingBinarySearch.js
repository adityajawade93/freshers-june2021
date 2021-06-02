const { recursiveFunction } = require('./binarySearch');

let arr = [1, 3, 5, 7, 8, 9];
let x = 5;

if (recursiveFunction(arr, x, 0, arr.length - 1) === true)
    console.log(x + ' found');
else
    console.log(x + ' not found');

x = 6;

if (recursiveFunction(arr, x, 0, arr.length - 1) === true)
    console.log(x + ' found');
else
    console.log(x + ' not found');