const setTimeOutwithPromiseFunc = function (sleepTime){ 
    const callback = (reject,resolve) => {
        // do async operation like api cal, timer, I/O operation, db call, etc
        if(sleepTime > 5000){
            reject(new Error('Not more than 5000'));
        }
        setTimeout(() => {
            resolve('promise resolved for ' + sleepTime)
        }, sleepTime);
    }
    return new Promise(callback); 
};
const temp = () => {
    throw new Error("Hi")
}
setTimeOutwithPromiseFunc(1000)
.then((data) => {
    console.log('first then', data);
    return setTimeOutwithPromiseFunc(6000)
},(error) => {
    console.log('error1 --->', error)
    return temp()
})
.then((data) => {
    console.log('second then', data);
    return setTimeOutwithPromiseFunc(2000)
},(error) => {
    console.log('error2 --->', error)
})
.catch((error) => {
    console.log('error --->', error)
});