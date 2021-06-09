function Animal(name, sound) {
    this.name = name;
    this.sound = sound;
}

Animal.prototype.speak = function () {
    console.log(`${this.name} says ${this.sound}`);
}

function Dog(name, sound) {
    Animal.call(this, name, sound);
}

Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.intro = function intro() {
    console.log(`Dog name: ${this.name}`);
}

function Cat(name, sound) {
    Animal.call(this, name, sound);
}

Cat.prototype = Object.create(Animal.prototype);

Cat.prototype.intro = function intro() {
    console.log(`Cat name: ${this.name}`);
}

let lion1 = new Animal('Lion1', 'roar');
lion1.speak();

let dog1 = new Dog('Dog1', 'woof');
dog1.speak();
dog1.intro();

let cat1 = new Cat('Cat1', 'woof');
cat1.speak();
cat1.intro();


