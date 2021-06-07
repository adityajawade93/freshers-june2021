// var person={
//     name:"anup",
//     Age:25,
//     place:"India"
// }
// console.log(person.Age)
// console.log(person)

// var people= new Object
// console.log(people)
// people.name="anup";
// people.age=26;
// people.location="Asia"
// console.log(people)

//for speed use the first one

// JavaScript Objects are Mutable

// var x=people;
// x.age=18
// console.log(people)

////////////////////////////////////////////////////////////
// JavaScript Properties

// Properties are the values associated with a JavaScript object.

// var student =new Object;
// student.id=10;
// student.name="subham"
// student.class="cse"
// console.log(student)
// console.log(student.property)

///////////////////////////////////////////
// var person={"fname":"anup","lname":"kumar","age":20}
// for (x in person)
// {
//     console.log(person[x])
// }
// person.nationlity="indian"
// for (x in person)
// {
//     console.log(person[x])
// }
// //Deleting the properties

// delete person.nationlity;
// for (x in person)
// {
//     console.log(person[x])
// }


/////////////////////////////////////////////

// Nested Objects

// Values in an object can be another object:

// myObj ={
//     name:"john",
//     age:60,
//     cars:{
//         car1:"ford",
//         car2:"BMW",
//         car3:"Fiat"
//     }
// }
// console.log(myObj)
// console.log(myObj.cars.car1)
// myObj ={
//     name:"john",
//     age:60,
//     cars:[
//         {name:"ford",model:"5A",Power:1000},
//         {name:"BMW",model:"6A",Power:2000},
//         {name:"fiat",model:"7A",Power:3000}
//     ]
// }

// console.log(myObj)
// for (i in myObj.cars)
// {
//     for (j in myObj.cars[i]){
//         console.log(myObj.cars[i][j])
//     }

// }
////////////////////////////////////////

var person=
{
    fname:"anup",
    lname:"jha",
    id:12,
    fullName : function()
    {
        return this.fname+" "+this.lname;
    }
}
// console.log(person.fullName())
// var full_name_rf=person.fullName()
// console.log(full_name_rf)

// Methods are functions stored as object properties.

// var f_name=person.fullName
// console.log(f_name)
///////////////////////////////////////////////


// /Built in MSInputMethodContext


// var message = "Hello world!";

// var upper = message.toUpperCase();
// var lower=message.toLocaleLowerCase();
// console.log(message,upper,lower)
// //ading new method to object

// person.id=function()
// {
//     return this.fname;
// }
// console.log(person.id());

/////////////////////////////////

// Using Object.values()
// var person = {name:"John", age:30, city:"New York"};
// console.log(person)
// var myArray=Object.values(person)
// console.log(myArray)

// // Using JSON.stringify()
// // Any JavaScript object can be stringified (converted to a string) with the JavaScript function 
// var myString=JSON.stringify(person)
// console.log(myString)

// var person1={name:"anup",data:new Date()}
// console.log(person1)
////////////////////////////////////////////////

// var person = {
//     firstName: "John",
//     lastName : "Doe",
//     language : "en",
//     get lang() {
//       return this.language;
//     }
//   };
// console.log(person)  
// var person = {
//     firstName: "John",
//     lastName : "Doe",
//     language : "",
//     set lang(lang) {
//       this.language = lang;
//     }
//   };
//   console.log(person)  


// var person = {
//     firstName: "John",
//     lastName : "Doe",
//     fullName : function() {
//       return this.firstName + " " + this.lastName;
//     }
//   };

// //   Example 1 access fullName as a function: person.fullName().

// //   Example 2 access fullName as a property: person.fullName.
// console.log(person.fullName())

///////////////////////////////////////////////////////////

// JavaScript Object Constructors

function Person(first,last,age)
{
    this.first=first,
    this.last=last,
    this.age=age
}