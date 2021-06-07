"use strict";

var setTimeOutwithPromiseFunc = function setTimeOutwithPromiseFunc(sleepTime) {
  var callback = function callback(resolve, reject) {
    // do async operation like api cal, timer, I/O operation, db call, etc
    if (sleepTime > 5000) {
      reject(new Error('Not more than 5000'));
    }

    setTimeout(function () {
      resolve('promise resolved for ' + sleepTime);
    }, sleepTime);
  };

  return new Promise(callback);
};

setTimeOutwithPromiseFunc(1000).then(function (data) {
  console.log('first then', data);
  return setTimeOutwithPromiseFunc(2000);
}).then(function (data) {
  console.log('second then', data);
})["catch"](function (error) {
  console.log('error --->', error);
});