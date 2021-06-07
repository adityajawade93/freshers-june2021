function DoSomething() {}

console.log(DoSomething.prototype)


// __proto__ ==> __proto__ ==> __proto__


// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// Person.prototype.sayHello = function() { console.log(`Hello my name is ${this.name}`) }

// Person.prototype.sayGoodBye = function() { console.log(`See you again!`) }

// Person.prototype.isAdult = function() { return this.age > 18 }

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