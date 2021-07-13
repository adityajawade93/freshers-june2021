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
callItAfterFewSec(200, print(print2)); // api call, db access, setTime, I/O operation
console.log('after');
for(let i=0;i<=100000000;i++) {
    continue;
}
for(let i=0;i<=100000000;i++) {
    continue;
}
console.log('after');
for(let i=0;i<=1000000000;i++) {
    continue;
}
for(let i=0;i<=100000000;i++) {
    continue;
}
for(let i=0;i<=100000000;i++) {
    continue;
}
console.log('after');