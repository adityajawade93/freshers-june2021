function animal(name,sound,food){
    this.name =name
    this.sound = sound
    this.food =food
}

animal.prototype.bark = function(){
    console.log(`${this.name} barks as ${this.sound}`)
}

animal.prototype.eat = function(){
    console.log(`${this.name} eats ${this.food}`)
}

function dog(name,sound,food,breed){
    animal.call(this,name,sound,food)
    this.breed = breed
    console.log(`${name} is a ${breed}`)
}

function cat(name,sound,food,breed){
    animal.call(this,name,sound,food)
    this.breed =breed
    console.log(`${name} is a ${breed}`)
}


dog.prototype = Object.create(animal.prototype)
let x = new dog('pixel' , 'bow' ,'meat', 'pug')
x.eat()
x.bark()


cat.prototype = Object.create(animal.prototype)
let y = new cat('maddy' , 'meow','meat','hybrid')
y.eat()
y.bark()

