// class Animal {
//     constructor(name) {
//       this.speed = 0;
//       this.name = name;
//     }
//     run(speed) {
//       this.speed = speed;
//       console.log(`${this.name} runs with speed ${this.speed}.`);
//     }
//     stop() {
//       this.speed = 0;
//       console.log(`${this.name} stands still.`);
//     }
//   }
  
//   let animal = new Animal("Jerry");
//   animal.run(25)
//   animal.stop()

//   class Cat extends Animal {
//     hide() {
//         console.log(`${this.name} hides!`);
//     }
//   }
  
//   let cat = new Cat("Tom");
  
//   cat.run(5); // White Rabbit runs with speed 5.
//   cat.stop();
//   cat.hide(); // White Rabbit hides!



function Animal(name) {
  this.name = name;
  this.speed = 0;
}

Animal.prototype.run = function(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}.`);
}

Animal.prototype.stop = function(){
    this.speed = 0;
    console.log(`${this.name} stands still.`);
}

let a1 = new Animal('Jerry')
a1.run(25)
a1.stop()

function Cat(name) {
    Animal.call(this, name)
}

Cat.prototype = Object.create(Animal.prototype)

Object.defineProperty(Cat.prototype, 'constructor', {
  value: Cat,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true 
});

Cat.prototype.hide = function () {
    console.log(`${this.name} hides!`);
}

let c1 = new Cat('Tom')
c1.run(5)
c1.stop()
c1.hide()