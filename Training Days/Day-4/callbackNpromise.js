// in js function are first class citizens
// meaning you can pass around function like data
 
const sum = function (a, b, callback) {
    callback(null, a + b)
    // return a + b;
 }
  
 const sub = function (a, b) {
    return a - b;
 }
  
 const calculator = function (a, b, action) {
    return action(a, b)
 }
  
 // console.log(calculator(3, 2, sum));
  
 // console.log(calculator(3, 2, sub));
  
 const callItAfterFewSec = function (sleepTime, callback) {
    console.log(2);
    if(sleepTime > 5000){
        callback(new error('cant be greater than 5000'));
    }
    setTimeout(function () { // api 1
        console.log(sleepTime, ' sec completed');
        console.log(3);
        callback(null, 'data 1');
    }, sleepTime);
 }
  
 function print(callback) { // fetch user
    console.log(1);
    return function (data) {
        console.log(4);
        setTimeout(function () { // api 2
            console.log('print called', data);
            console.log(5);
            callback('err', 'data 2');
        }, 100);
    }
 }
  
 function print2(print1Data) {
    console.log(6);
    console.log('print2 called', print1Data); // store in machine
 }
  
 // api1 -> read file --> api2 ---> console
  
  
 // console.log('before');
 // callItAfterFewSec(2000, print(print2)); // api call, db access, setTime, I/O operation
 // console.log('after');
  
  
  
 // in node all callback for fs, api call, any other util function, first object is error, second is data
 // const doSomethingwithfile = function (err, data) {
    //     if (err) {
    //         console.log(error);
    //     }
    //     console.log('got data);
    // }
  
 // fs.readFile(path, doSomethingwithfile);
  
 // callback hell
 // promise
  
  
  
//  const promiseCallback = (res, rej) => {
//      // do async operation like api cal, timer, I/O operation, db call, etc
//      res({ data: 'arnub promise resolved'})
//      setTimeout(() => {
//          console.log('settimout resolved');
//          res({ data: 'arnub promise resolved'});
//         }, 1000);
//     rej('rejecting before')
//  }
  
//  const setTimeOutwithPromise = new Promise(promiseCallback);
  
  
  
  
//  const thenCallback = (data) => {
//      console.log('will never reach here --->', data)
//  };
  
//  setTimeOutwithPromise
//      .then(thenCallback)
//      .catch((error) => {
//          console.log('error ----->', error)
//      })
  
  

  
  
  
  
//  const setTimeOutwithPromiseFunc = function (sleepTime){
//     const callback = (resolve, reject) => {
//         // do async operation like api cal, timer, I/O operation, db call, etc
//         if(sleepTime > 5000){
//             reject(new Error('Not more than 5000'));
//         }
//         setTimeout(() => {
//             resolve('promise resolved for ' + sleepTime)
//         }, sleepTime);
//     }
//     return new Promise(callback);
//  };
  
//  setTimeOutwithPromiseFunc(1000)
//  .then((data) => {
//     console.log('first then', data);
//     return setTimeOutwithPromiseFunc(2000)
//  })
//  .then((data) => {
//     console.log('second then', data);
//  })
//  .catch((error) => {
//     console.log('error --->', error)
//  });
  
  
 // making api calls
  
 // using callbacks with request package
  
 var request = require('request');
 var options = {
  'method': 'GET',
  'url': 'https://api.instantwebtools.net/v1/airlines/8',
  'headers': {}
 };
  
 request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(JSON.parse(response.body));
 });
  
 // JSON stringify and parse
  
 // using axios and promise
  
 var axios = require('axios');
  
 axios(options)
 .then(function (response) {
  console.log(response.data);
 })
 .catch(function (error) {
  console.log(error);
 });
  
  
 //
  
 // create folder called callbackNPromises
 // do npm init
 // install request and axios
 // create a file called callbackApiCall.js in this file fetch airline 8, once you get data fetch airline 9 using callback
 // create a file called promiseApiCall.js in this file fetch airline 8, once you get data fetch airline 9 using promise
  
 
 