// import { EventEmitter } from 'events';
// const eventEmitter=new EventEmitter();

//listen to the event
// eventEmitter.on('myEvent',()=>{
//     console.log("data recieved");
// });

// eventEmitter.emit("myEvent");
// -------------------------------------------------
// eventEmitter.on('myEvent',()=>{
//     console.log("Listener 1");
// });

// eventEmitter.emit("myEvent");

// eventEmitter.on('myEvent',()=>{
//     console.log("Listener 2");
// });

// ------------------------------------------------------

//Maintaning the single Event Emitter Instance

// import { EventEmitter } from 'events';
// import express from 'express';

// const eventEmitter =new EventEmitter();

// const app= express();
// app.set('eventEmitter',eventEmitter);

// console.log(app.get('eventEmitter'));


// -------------------------------------------------------------

// import {EventEmitter} from 'events';
// const eventEmitter = new EventEmitter();
// eventEmitter.on('myEvent',(data)=>{
//     console.log(data)
// });

// console.log("Statement A");
// eventEmitter.emit('myEvent','Statement B');
// console.log("Statement C");

// ---------------------------------------------------------------
// Order of Execution of the Listeners

// import {EventEmitter} from 'events';
// const eventEmitter = new EventEmitter();

// eventEmitter.on('myEvent',(data)=>{
//     console.log(data,'-FIRST');
// })

// console.log("Statement A");
// eventEmitter.on('myEvent',data=>{
//     console.log(data,'-SECOND');
// });

// eventEmitter.emit('myEvent','Emitted Statement');
// console.log("Statement B");
//-------------------------------------

//How the Nodejs internally uses Event Emitters

import {createReadStream} from "fs";

let chunkIndex=0;
const readStream = createReadStream("./data.txt");

readStream.on("open",()=>{
console.log("Started Reading...");
});

readStream.on("end",()=>{
    console.log("completed Reading...");
});

readStream.on("data",chunk=>{
    console.log("Chunk: "+ ++chunkIndex);
    console.log("----------------");
    console.log(chunk);
    console.log("\n");
})