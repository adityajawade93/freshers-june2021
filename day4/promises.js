const { AsyncLocalStorage } = require("async_hooks");

const promiseCallback = (resolve, reject) => {
    // do async operation like api cal, timer, I/O operation, db call, etc
    setTimeout(() => {
        resolve('promise resolved')
    }, 5000);
}
AsyncLocalStorage
const setTimeOutwithPromise = new Promise(promiseCallback);





setTimeOutwithPromise
    .then((data) => {
        console.log('data --->', data)
    })
    .catch((error) => {
        console.log('error ----->', error)
    })

// making api calls 

// using callbacks with request package


//Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.

// var request = require('request');
// var options = {
//   'method': 'GET',
//   'url': 'https://api.instantwebtools.net/v1/airlines/8',
//   'headers': {}
// };


// request(options, function (error, response,body) {
//   if (error) throw new Error(error);
//   console.log(JSON.parse(body));
// });

// JSON stringify and parse

// using axios and promise

// var axios = require('axios');

// axios(options)
// .then(function (response) {
//   console.log(response.data);
// })
// .catch(function (error) {
//   console.log(error);
// });