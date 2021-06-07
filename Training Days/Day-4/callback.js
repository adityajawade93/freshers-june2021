// in js function are first class citizens
// meaning you can pass around function like data

const sum = function (a, b, callback) {
    // callback(null, a + b)
    return a + b;
 }
  
 const sub = function (a, b) {
    return a - b;
 }
  
 const calculator = function (a, b, action) {
    return action(a, b)
 }
  
 console.log(calculator(3, 2, sum));  
 console.log(calculator(3, 2, sub));

 
 // api1 -> read file --> api2 ---> console


const callItAfterFewSec = function(sleepTime, callback){
    console.log(2);
    setTimeout(function(){ // api 1
        console.log(sleepTime, ' sec completed');
        console.log(3);
        callback('data 1');
    }, sleepTime);
}

function print(callback){ // fetch user 
    console.log(1);
    return function(data){
        console.log(4);
        setTimeout(function(){ // api 2
            console.log('print called', data);
            console.log(5);
            callback('data 2');
        }, 100);
    }
}

function print2(print1Data){
    console.log(6);
    console.log('print2 called', print1Data); // store in machine
}

console.log('before');
callItAfterFewSec(2000, print(print2)); // api call, db access, setTime, I/O operation
console.log('after');


 // in node all callback for fs, api call, any other util function, first object is error, second is data
//  const doSomethingwithfile = function (err, data) {
//         if (err) {
//             console.log(error);
//         }
//         console.log('got data');
//     }
  
//  fs.readFile(path, doSomethingwithfile);