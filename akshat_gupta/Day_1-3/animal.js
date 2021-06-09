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

Animal.prototype.getType = function() {
    return this.type
}

function Dog(type, family, species, color, age) {
    Animal.call(this,type,family)
    this.species = species;
    this.color = color;
    this.age=age
}

Dog.prototype = Object.create(Animal.prototype)

Object.defineProperty(Dog.prototype, 'constructor', {
  value: Dog,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true 
});

Dog.prototype.getSpecies = function() {
    return this.species
}

Dog.prototype.sayHello = function() {
    return "bark...woof...bark..!!"
}

Dog.prototype.getAge = function() {
    return this.age
}

function Cat(type, family, species, color,age) {
    Animal.call(this,type,family)
    this.species = species;
    this.color = color;
    this.age=age
}

Cat.prototype = Object.create(Animal.prototype)

Object.defineProperty(Cat.prototype, 'constructor', {
  value: Cat,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true 
});

Cat.prototype.getSpecies = function() {
    return this.species
}

Cat.prototype.sayHello = function() {
    return "meow?!"
}

Cat.prototype.getAge = function() {
    return this.age
}

module.exports = {Animal,Dog,Cat}