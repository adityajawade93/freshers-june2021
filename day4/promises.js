const { AsyncLocalStorage } = require("async_hooks");

const promiseCallback = (resolve, reject) => {
    // do async operation like api cal, timer, I/O operation, db call, etc
    setTimeout(() => {
        resolve('promise resolved')
    }, 5000);
}

const setTimeOutwithPromise = new Promise(promiseCallback);





setTimeOutwithPromise
    .then((data) => {
        console.log('data --->', data)
    })
    .catch((error) => {
        console.log('error ----->', error)
    })
