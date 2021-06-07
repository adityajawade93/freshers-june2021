function Animal(name, age,colour) {
    this.name = name;
    this.age = age;
    this.colour=colour;
}
Animal.prototype.info = function() {
    console.log(`Animal name is ${this.name}, age ${this.age} with color ${this.colour}`);
}

function Dog(name, age, colour,Bark) {
    Animal.call(this, name, age,colour)
  this.Bark = Bark
}

function Cat(name, age, colour,Bark) {
    Animal.call(this, name, age,colour)
    this.Bark = Bark
  }

  Dog.prototype = Object.create(Animal.prototype)
  Cat.prototype = Object.create(Animal.prototype)

var cat1=new Cat("luci",2,"black","meow")

var cat2=new Cat("nini",1,"white","meow")
var Dog1=new Dog("Tommy",2,"black","bhau")
var Dog2=new Dog("Jommy",2,"black","bhau")
console.log(Dog1.info())
console.log(cat1.info())
console.log(cat2.info())
console.log(Dog2.info())
