function DoSomething() {}

console.log(DoSomething.prototype)


// __proto__ ==> __proto__ ==> __proto__


function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function() { console.log(`Hello my name is ${this.name}`) }

Person.prototype.sayGoodBye = function() { console.log(`See you again!`) }

Person.prototype.isAdult = function() { return this.age > 18 }

// let p1 = new Person('Alice', 23)

// p1 = Object.create(Person)
// this.name = name
// this.age = age
// this -> p1

// function Professional(name, age, profession) {
//   Person.call(this, name, age)
//   this.profession = profession
// }

// Professional.prototype = Object.create(Person.prototype)

// Object.defineProperty(Professional.prototype, 'constructor', {
//   value: Professional,
//   enumerable: false, // so that it does not appear in 'for in' loop
//   writable: true });

// Professional.prototype.sayProfession = function () {
//   console.log(`My name is ${this.name} and i am a ${this.profession}`)
// }


// let pro1 = new Professional('aditya', 28, 'SDE')

// pro1.sayProfession()

// pro1.sayHello()

// Class Keyword

// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }

//   sayHello() {
//     console.log('Hello my name is '+ this.name);
//   }

//   isAdult() {
//     return this.age > 18;
//   }
// }

// let p1 = new Person('aditya', 28);

// p1.sayHello();
// console.log(p1.isAdult());

// p1.name = 'john'
// p1.sayHello();

// class Professional extends Person {
//   constructor(name, age, profession) {
//     super(name, age);
//     this.profession = profession
//   }

//   sayProfession() {
//     console.log(`My name is ${this.name} and i am a ${this.profession}`)
//   }
// }

// let pro1 = new Professional('aditya', 28, 'Software Engineer')

// pro1.sayProfession()


// var ref;

// function outer() {
//   var a = 100;
//   var b = 900;
//   var c = 700;
//   function inner() {
//     console.log(a)
//   }

//   function inner2() {
//     console.log(b)
//   }
//   return {
//     inner2,
//     inner
//   }
// }

// const obj = outer()

// obj.inner()
// obj.inner2()


// function Person(name, age) {
//   return Object.freeze({
//     sayHello: function() {
//       console.log(`Hello My name is ${name} and my age is ${age}`)
//     }
//   })
// }

// let p1 = Person('aditya', 28)
// p1.sayHello()

// p1.name = 'Jhon'
// p1.sayHello()

// function doesSomething() { 
//   var v1 = 10; 
//   var v2 = 100;

//   console.log(v1, v2)
// }

// doesSomething()

// function createCounter() {
//   let counter = 0;
//   return Object.freeze({
//     incrementCount: function() {
//       counter += 1;
//     },
//     getCounter: function() {
//       return counter;
//     }
//   })
// }

// function counters() {
//   let c1 = createCounter();
//   let c2 = createCounter();

//   c1.incrementCount()
//   c1.incrementCount()
//   c1.incrementCount()
//   c1.incrementCount()
//   c1.incrementCount()
//   c1.incrementCount()

//   console.log(c1.getCounter())

//   c2.incrementCount()
//   c2.incrementCount()
//   c2.incrementCount()
//   c2.incrementCount()


//   console.log(c2.getCounter())
// }

// function dummy() { console.log('Hello') }

// counters()
// dummy()











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

// function Person(first,last,age)
// {
//     this.first=first,
//     this.last=last,
//     this.age=age
// }

// var A = new Person("John", "Doe", 50, "blue");
// var B = new Person("Sally", "Rally", 48, "green");
// console.log(A,B)
// In JavaScript, the thing called this is the object that "owns" the code.

// The value of this, when used in an object, is the object itself.
//////////////////////////////////////////////

// a function can be added to object but not to a object constructor

// function Person(first,last)
// {
//     this.first=first;
//     this.last=last;
// }
// var p1=new Person("anup","Jha");
// Person.nationality="indian"
// console.log(p1)


//Adding a Property to an Object is easy
//Adding a Method to an Object is easy
//Adding a Property to a Constructor is not possible
// You cannot add a new method to an object constructor the same way you add a new method to an existing object.
//Built in Object
// var x1 = new Object();    // A new Object object
// var x2 = new String();    // A new String object
// var x3 = new Number();    // A new Number object
// var x4 = new Boolean();   // A new Boolean object
// var x5 = new Array();     // A new Array object
// var x6 = new RegExp();    // A new RegExp object
// var x7 = new Function();  // A new Function object
// var x8 = new Date();      // A new Date object 

//Literal Method
// var x1 = {};            // new object
// var x2 = "";            // new primitive string
// var x3 = 0;             // new primitive number
// var x4 = false;         // new primitive boolean
// var x5 = [];            // new array object
// var x6 = /()/           // new regexp object
// var x7 = function(){};  // new function object 
////////////////////////////////////////////////////////////////

// Javascript Object Prototype

// function Person(first,last,age)
// {
//     this.first=first;
//     this.last=last;
//     this.age=age;
// }
// var person1=new Person("anup","Kumar",25);
// var person2=new Person("Subham","Kumar",35);
// //trying to add the new property to existing object Constructor
// Person.nationality = "English";
// console.log(person1)

// function Person(first,last,age)
// {
//     this.first=first;
//     this.last=last;
//     this.nationality="indian";
// }

// console.log(person1)

//////////////////////////////////////////
// Adding Properties and Methods to Objects

//JS prototype property allows to add new properties to object constructors

// function Person(first, last, age, eye) {
//     this.firstName = first;
//     this.lastName = last;
//     this.age = age;
//     this.eyeColor = eye;
//   }
  
//   Person.nationality = "English";
//   var myFather = new Person("John", "Doe", 50, "blue");
//   console.log(myFather)
//   console.log(myFather.nationality)
//   Person.prototype.nationality = "English";
//   console.log(myFather)
//   console.log(myFather.nationality)

//////////////Adding the function 
// Person.name=function()
// {
//     return this.firstName+" "+this.lastName;
// }
//   var myFather = new Person("John", "Doe", 50, "blue");

// console.log(myFather.name)

// Person.prototype.name=function()
// {
//     return this.firstName+" "+this.lastName;
// }

// console.log(myFather.name())

// var person = {
//     firstName: "John",
//     lastName : "Doe",
//     language : "EN"
//   };

// console.log(Object.getOwnPropertyNames(person))

// function DoSomething() {
    
// }

// console.log(DoSomething.prototype)
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
//   }
  
//   Person.prototype.sayHello = function() { console.log(`Hello my name is ${this.name}`) }
  
//   Person.prototype.sayGoodBye = function() { console.log(`See you again!`) }
  
//   Person.prototype.isAdult = function() { return this.age > 18 }
// var p1=new Person("anup",25)
// console.log(p1)
// console.log(p1.sayHello())
// console.log(p1.sayGoodBye())
// console.log(p1.isAdult())

// function Professional(name, age, profession) {
//   Person.call(this, name, age)
//   this.profession = profession
// }

/////////////////////////////////////////////////////////////////////

// function outer() {
//   var a = 100;
//   var b = 900;
//   var c = 700;
//   function inner() {
//     console.log(a)
//   }
//     function inner2() {
//     console.log(b)
//   }
//   return {
//     inner2,
//     inner
//   }
// }

// const obj = outer()
// console.log(obj)
// console.log(obj.inner())
// console.log(obj.inner2())
////////////////////////////////////////////////////////////////////////

//Object freeze
// function Person(name, age) {
//   return Object.freeze({
//     sayHello: function() {
//       console.log(`Hello My name is ${name} and my age is ${age}`)
//     }
//   })
// }

// let p1 = Person('aditya', 28)
// p1.sayHello()

// p1.name = 'Jhon'
// p1.sayHello()


// function doesSomething() { 
//   var v1 = 10; 
//   var v2 = 100;

//   console.log(v1, v2)
// }
// doesSomething()
//////////////////////////////////////////////////////////////////////////////
function createCounter() {
  let counter = 0;
  return Object.freeze({
    incrementCount: function() {
      counter += 1;
    },
    getCounter: function() {
      return counter;
    }
  })
}
console.log(createCounter())
function counters() {
  let c1 = createCounter();
  let c2 = createCounter();

  c1.incrementCount()
  c1.incrementCount()
  c1.incrementCount()
  c1.incrementCount()
  c1.incrementCount()
  c1.incrementCount()

  console.log(c1.getCounter())

  c2.incrementCount()
  c2.incrementCount()
  c2.incrementCount()
  c2.incrementCount()


  console.log(c2.getCounter())
}
counters()
function dummy() { console.log('Hello') }

counters()
dummy()
