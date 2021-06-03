const binarySearch = require('./binarySearch')
const fibonacci = require('./fibonacci')
const duplicate = require('./duplicate')
const thirdHighest = require('./thirdhighest')

// Binary Search
let v=[1,2,3,4,,67,90,29,5,6,7,8,9,10,10,200,88,302,99,6]
let target=20
let answer=binarySearch(v,target);
if(answer)
    console.log("Value exists in Array.")
else 
    console.log("Value does not exist in Array.")

// Print Fibonacci
let n=10
fibonacci(n)

// Find Duplicate
duplicate(v)

// Find 3rd Highest
thirdHighest(v)