const { binary_search } = require('./binarySearch');


const arr = [1, 3, 5, 7, 8, 9];
let x = 5;

if (binary_search (arr, x))
    console.log(x + ' found');
else
    console.log(x + ' not found');

x = 6;

if (binary_search (arr, x))
    console.log(x + ' found');
else
    console.log(x + ' not found');





















