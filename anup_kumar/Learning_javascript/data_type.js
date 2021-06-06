//source https://www.programiz.com/javascript/data-types
// type of data types
/*
string "anup"
Number  3,3.5,3e2
BigInt large arbitrary no
Boolean true false
undefined let a//whose variable is not initlized
nul let a=null
Symbol let value=Symbol('hello)
{it is immutable and unique}
Object let student={};
*/

const { copyFileSync } = require("fs");
const { type } = require("os");

/////////////////////string example
//strings example
const name = 'ram';
const name1 = "hari";
const result = `The names are ${name} and ${name1}`;
const result2=`the name is ${name1} and ${name}` //blacktick is required "" & '' not works for calling under the string

// console.log(result2)

////////////////////Number

const num1=3
const num2=3.45
const num3=3e6
// console.log(num1,num2,num3)

//+ infinity ,-Infinity ,Nan
const num4=3/0;
// console.log(num4)
const num5=-3/0;
// console.log(num5)
const num6="abc"/3;
// console.log(num6)
///////////////////////Big Int
// const value1=90000000000000000000000000000000;

// const result3=value1+1n// appending the 1n to a number

// console.log(result3)

// // Error! BitInt and number cannot be added
// const result4 = value3 + 1; 
// console.log(result4); 

////////////////Boolean
/*

const bool1=true;
const bool2=false;
//////////////////////Undefined
let name5;
console.log(name5)

//explitly assing the variable
let name6=undefined;
console.log(name6)

///////////////////Null
const num7=null;
console.log(num7)
//null and NULL is not same
*/

//////////////////////Symbol
// two symbols with the same description

/*const value1 = Symbol('hello');
const value2 = Symbol('hello');
console.log(value1,value2)

///////////////////////Object 

const student={
    firstname:"ram",
    lastname:null,
    class:10
}
console.log(student)
*/
/////////////////////////Type
//loosly typed so automatically determine the varible's
// data type for you

/*
let data;
console.log(typeof(data))
data=4;
console.log(typeof(data))
data="test"
console.log(typeof(data))
data=false
console.log(typeof(data))
data=null
console.log(typeof(data))

*/
//////////////////////OPerator
//same as c++ for most of operator
//comparison
/*
let a="5"
let b=5
if(a==b)console.log("true") //returns true if the operands are equal
if(a===b)console.log("type and same");//ue if the operands are equal and of the same type

else console.log("stricltly not same")
if(a!=b)console.log("not same")
else console.log("same")

if(a!==b)console.log("strictly not same")
else console.log("same")

*/

///////////////////////////String opertor
//concat
/*console.log("ram"+" syam")
let a="java";
a+="script"
console.log(a)
*/
//SOme other operator
/*
let a=(1,2,4)
console.log(a)
// ternary opertor
console.log(a==4?"yes":"no")
*/
///////////delete operator
let x=5;
console.log(x)
delete x;
console.log(x)

const number = prompt("Enter a number: ");

// check if number is greater than 0
if (number > 0) {
 // the body of the if statement
  console.log("The number is positive");
}

console.log("The if statement is easy");