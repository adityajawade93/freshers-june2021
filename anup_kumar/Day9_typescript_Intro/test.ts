// function sum(a:number,b:number):number
// {
//     return a+b;
// }
// console.log(sum(10,15));


// const user={
//     name:"Hayes",
//     id:0,
// }
// console.log(user)

interface User{
name:string,
id:number,
}

// const user:User={
//     name:"hayes",
//     id:0,
//     // p:5,
// }
// console.log(user)

class Useraccount
{
    name:string;
    id:number;
    constructor(name:string,id:number)
    {
        this.name=name;
        this.id=id;
    }
}
const user:User=new Useraccount("Murphy",1);
console.log(user);

function deleteUser(user:User)
{
    user.name="";
    user.id=0;
}

//some types of javascript 
//boolean,bigint,null,number,string,symbol,undefined
// some other that are provided
// AnalyserNode,unknown


////////////////////////Unions
// type Mybool=true|false|string;
// const test:Mybool=false;
// console.log(test);

type WindowStates="open"|"closed"|"Minimized";
type LockedState="locked"|"unlocked";
type PositiveOddNoUnderTen=1|2|3|5|7|9;
function getLength(obj:string|string[])
{
    return obj.length;
}
console.log(getLength(["anup","subham"]))

/*
Type	Predicate
string	typeof s === "string"
number	typeof n === "number"
boolean	typeof b === "boolean"
undefined	typeof undefined === "undefined"
function	typeof f === "function"
array	Array.isArray(a)
*/
function wrapInArray(obj: string | string[]) {
    if (typeof obj === "string") {
      return [obj];
    } else {
      return obj;
    }
  }

  console.log(wrapInArray(["anup","subham"]));
/////////////////////////////////////////

// Generics
type StringArray=Array<string>;
type NumberArray=Array<number>;
type ObjectWithNameArray=Array<{name:string}>;