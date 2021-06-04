function Animal(name, age) {
    this.name = name;
    this.age = age;

}
Animal.prototype.getName = function () { console.log(`Name of animal is ${this.name}.`) 
return `Name of animal is ${this.name}.`}

Animal.prototype.getAge = function () { console.log(`Age of animal is ${this.age}.`) 
return `Age of animal is ${this.age}.` }

function Dog(name, age, breed, color, isVaccinated) {
    Animal.call(this, name, age);
    this.breed = breed;
    this.color = color;
    this.isVaccinated = isVaccinated;
}

Dog.prototype = Object.create(Animal.prototype);

Object.defineProperty(Dog.prototype, 'constructor', {
    value: Dog,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true
});
Dog.prototype.getName = function () { console.log(`Name Of Dog is ${this.name}`)
return `Name Of Dog is ${this.name}` }
Dog.prototype.getBreed = function () { console.log(`Breed Of Dog is ${this.breed}`) }
Dog.prototype.getColor = function () { console.log(`Color Of Dog is ${this.color}`) }
Dog.prototype.isVaccinated = function () { console.log(`Dog is vaccinated = ${this.breed}`) }



function Cat(name, age, breed, color, isVaccinated) {
    Animal.call(this, name, age);
    this.breed = breed;
    this.color = color;
    this.isVaccinated = isVaccinated;
}

Cat.prototype = Object.create(Animal.prototype);

Object.defineProperty(Dog.prototype, 'constructor', {
    value: Cat,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true
});
Cat.prototype.getName = function () { console.log(`Name Of cat is ${this.name}`) 
return `Name Of Cat is ${this.name}`}
Cat.prototype.getBreed = function () { console.log(`Breed Of cat is ${this.breed}`) }
Cat.prototype.getColor = function () { console.log(`Color Ofcat is ${this.color}`) }
Cat.prototype.isVaccinated = function () { console.log(`cat is vaccinated = ${this.breed}`) }


// let animal = new Animal('henry', 6)
// console.log(animal);
// animal.getName()


/////////////////////////////////

// let dog = new Dog('tommy', 5, 'pitbull', 'brown', true);
// console.log(dog);
// dog.getName()
// ///////////////////////////

let cat = new Cat('lucy', 2, 'persian', 'white', true);
console.log(cat);
cat.getName()

module.exports = {Animal,Dog,Cat};