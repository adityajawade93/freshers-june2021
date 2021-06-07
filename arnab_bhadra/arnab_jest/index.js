// const {iterativeBinarySearch, linearSearch} = require("./search");
// let array=[1,2,3,4,5,6,7];
// var key=50;
// if(iterativeBinarySearch(array,key)){
//     console.log("Found");
// }
// else{
//     console.log("Not Found");
// }
// key=7;
// if(linearSearch(array,key)){
//     console.log("Found");
// }
// else{
//     console.log("Not Found");
// }
const search = require("./search");
const {findDublicateInArray} =require("./dublicate");
const findThirdHighestNumber1=require("./findThirdMax");
// let array=[1,2,3,4,5,6,7];
// var key=50;

// if(search.iterativeBinarySearch(array,1)){
//     console.log("Found");
// }
// else{
//     console.log("Not Found");
// }
// key=7;


// if(search.linearSearch(array,key)){
//     console.log("Found");
// }
// else{
//     console.log("Not Found");
// }
//  let arrayOfNumbers=[2,5,4,33,4,5,5];
//  var dublicateArray=findDublicateInArray(arrayOfNumbers);
//  console.log(dublicateArray);

// arrayOfNumbers=[2,7,33,4,5,12];
// var dublicateArray=findDublicateInArray(arrayOfNumbers);
// console.log(dublicateArray);
// console.log(findThirdHighestNumber1(arrayOfNumbers));
const {fibonacciSeriesList} = require("./fibonacci");
console.log(fibonacciSeriesList(4));