// const ab = 20;
// function outer() {
//     const abc = 20;
//     const b = 20;
//     function inner() {
//         if(true){
//             let a = 10;
//             console.log(a);
//         }
//         // console.log(a) //error as a has block scope
//         console.log(b, abc);
//         console.log(ab);
//     }
//     return inner;
// }
// // var fun1=outer();
// // fun1()

// function Upperouter() {
//     var inner_ret=outer();
//     inner_ret() 
// }

// Upperouter()
/////////////////////////////////////////////////////////////////////////
// scope
// global 
// function 
// block // if, for, while .... let, const are block
// var, let, const


// top level abc 
        // outer execution abc, b
                // inner
// innerFub decalred has a ref inner                
// innerFun execution 
                        // if block a
                    // a  not accessable
//////////////////////////////////////////////////////////////////////////
// Hoisting of var
// Hoisting is a JavaScript mechanism where variables and function declarations
//  are moved to the top of their scope before code execution.
// console.log (greeter);
// const greeter = "say hello"
//here it will be iterpreted as 

/*
    var declarations are globally scoped or function scoped while let and const are block scoped.
    var variables can be updated and re-declared within its scope; let variables can be updated but not re-declared; const variables can neither be updated nor re-declared.
    They are all hoisted to the top of their scope. But while var variables are initialized with undefined, let and const variables are not initialized.
    While var and let can be declared without being initialized, const must be initialized during declaration.
*/

/////////////////////////////////////////////////////////////////////////////

// const obj = {
//     name: "anoop",
//     sayName: function(){
//         console.log(this.name);
//     }
// }

// const obj2 = {
//     name: "anoop2",
//     sayName2: function(){
//         console.log(this.name);
//     }
// }
// console.log(obj.sayName()); /// output anoop
// console.log(name); // anoop

// const sayName = obj.sayName;
// const sayName2 = obj2.sayName2;
// sayName2(); // prints undefined
// sayName(); // prints undefined
// this.name = 'arnub';
// sayName2(); // prints arnub
// sayName(); // prints arnub

// const sayNameBind = obj.sayName.bind(obj);
// const sayName2Bind = obj2.sayName2.bind(obj2);

// this.name = 'arnub';

// sayNameBind(); // annop
// sayName2Bind(); // anoop2

/////////////////////////////////////////////////////////////////////////////////////

// const set = new Set();
// set.add(1)           // Set [ 1 ]
// set.add(5)           // Set [ 1, 5 ]
// set.add(5)           // Set [ 1, 5 ]
// console.log(set)
// console.log('has 5', set.has(5)) // true
// set.delete(5)    // removes 5 from the set
// console.log('has 5', set.has(5))       // false, 5 has been removed
// set.add({a: 1, b: 2}) // any data type can be added
// console.log(set)

// for (let item of set) console.log(item); // looping

// const arr = Array.from(set); // convert to array

// console.log('array ', arr);
// console.log('set', set);

// // more on this https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

//.......................................................................................


// let map = new Map()
// map.set('key', 'value');
// console.log('has key', map.has('key')); // true
// console.log('get key', map.get('key')); // map.key 
// console.log(map.size) // 1
// map.set('key2', {key: "value"});
// console.log(map);
// map.delete('key2');
// console.log('after delete', map);

// more on this https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

//////////////////////////////////////////////////////////////////////////////////////////////////


// const callItAfterFewSec = function(sleepTime, callback){
//     console.log(2);
//     setTimeout(function(){ // api 1
//         console.log(sleepTime, ' sec completed');
//         console.log(3);
//         callback('data 1');
//     }, sleepTime);
// }

// function print(callback){ // fetch user 
//     console.log(1);
//     return function(data){
//         console.log(4);
//         setTimeout(function(){ // api 2
//             console.log('print called', data);
//             console.log(5);
//             callback('data 2');
//         }, 100);
//     }
// }

// function print2(print1Data){
//     console.log(6);
//     console.log('print2 called', print1Data); // store in machine
// }

// console.log('before');
// callItAfterFewSec(2000, print(print2)); // api call, db access, setTime, I/O operation
// console.log('after');

// output:
// {Before,
// function_calling(callItAfterFewSec),
// print 1
// }

////////////////////////////////////////////////////////////////////////////////////////
//arroy function 
// const promiseCallback = (resolve, reject) => {
//     // do async operation like api cal, timer, I/O operation, db call, etc
//     setTimeout(() => {
//         resolve('promise resolved')
//     }, 1000);
// }

// const setTimeOutwithPromise = new Promise(promiseCallback);

// setTimeOutwithPromise
//     .then((data) => {
//         console.log('data --->', data)
//     })
//     .catch((error) => {
//         console.log('error ----->', error)
//     })
/////////////////////////////////////////////////////////////////////////

// making api calls 

// using callbacks with request package

// var request = require('request');
// var options = {
//   'method': 'GET',
//   'url': 'https://api.instantwebtools.net/v1/airlines/8',
//   'headers': {}
// };

// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   console.log(JSON.parse(response.body));
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



// setTimeOutwithPromise
//     .then((data) => {
//         console.log('data --->', data)
//     })
//     .catch((error) => {
//         console.log('error ----->', error)
//     })