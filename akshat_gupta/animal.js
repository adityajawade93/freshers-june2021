// class Animal {
//   constructor(type, family) {
//     this.type = type;
//     this.family = family;
//   }
// }
// class Dog extends Animal {
//   constructor(type, family, species, color) {
//     super(type,family)
//     this.species = species;
//     this.color = color;
//   }
// }
// class Cat extends Animal {
//   constructor(type, family, species, color) {
//     super(type,family)
//     this.species = species;
//     this.color = color;
//   }
// }
// let a = new Animal("dog","cats") 
// console.log(a)
// let d = new Dog("dog","canine","labrador","black")
// console.log(d)

function Animal(type, family) {
    this.type = type;
    this.family = family;
}

function Dog(type, family, species, color) {
    Animal.call(this,type,family)
    this.species = species;
    this.color = color;
}

Dog.prototype = Object.create(Animal.prototype)

Object.defineProperty(Dog.prototype, 'constructor', {
  value: Dog,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true 
});

function Cat(type, family, species, color) {
    Animal.call(this,type,family)
    this.species = species;
    this.color = color;
}

Cat.prototype = Object.create(Animal.prototype)

Object.defineProperty(Cat.prototype, 'constructor', {
  value: Cat,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true 
});

let a = new Animal("dog","cats") 
console.log(a)
let c = new Cat("cat","canine","labrador","black")
console.log(c)