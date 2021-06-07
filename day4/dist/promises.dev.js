"use strict";

var _require = require("async_hooks"),
    AsyncLocalStorage = _require.AsyncLocalStorage;

var promiseCallback = function promiseCallback(resolve, reject) {
  // do async operation like api cal, timer, I/O operation, db call, etc
  setTimeout(function () {
    resolve('promise resolved');
  }, 5000);
};

var setTimeOutwithPromise = new Promise(promiseCallback);
setTimeOutwithPromise.then(function (data) {
  console.log('data --->', data);
})["catch"](function (error) {
  console.log('error ----->', error);
});