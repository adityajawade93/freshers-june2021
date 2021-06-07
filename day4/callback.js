const callItAfterFewSec = (sleeptime,callback)=>{
    
    setTimeout(()=>{
        console.log(2);
        console.log(sleeptime,'sec completed');
        console.log(3);
        callback('data 1');
    }, sleeptime);
}


const print = (callback)=>{
    console.log(1);
    return (data)=>{
        console.log(4);
        setTimeout(()=>{
            console.log('print called', data);
            console.log(5);
            callback('data2');
        },0)
    }
}

function print2(print1Data){
    console.log(6);
    console.log('print2 called', print1Data); // store in machine
}

console.log('before');
callItAfterFewSec(2000, print(print2)); // api call, db access, setTime, I/O operation
console.log('after');