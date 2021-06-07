"use strict";

var _require = require("async_hooks"),
    AsyncLocalStorage = _require.AsyncLocalStorage;

var promiseCallback = function promiseCallback(resolve, reject) {
  // do async operation like api cal, timer, I/O operation, db call, etc
  setTimeout(function () {
    resolve('promise resolved');
  }, 5000);
};

AsyncLocalStorage;
var setTimeOutwithPromise = new Promise(promiseCallback);
setTimeOutwithPromise.then(function (data) {
  console.log('data --->', data);
})["catch"](function (error) {
  console.log('error ----->', error);
}); // making api calls 
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