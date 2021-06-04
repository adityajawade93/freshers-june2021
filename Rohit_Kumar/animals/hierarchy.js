class animals{
    constructor(type,color){
        this.type = type;
        this.color = color
    }
    about(){
        console.log('it is a '+this.type+' animal and its '+this.color)
    }
}

class Dog extends animals{
    constructor(type,color,food,sound){
        super(type,color)
        this.food = food
        this.sound = sound
    }
    barking(){
        console.log('food is '+this.food+' and do '+this.sound);
    }
}

class Cat extends animals{
    constructor(type,color,food, sound){
        super(type,color);
        this.food = food;
        this.sound = sound;
    }
    noise(){
        console.log('food is '+this.food+' and do '+this.sound)
    }
}

// var main = new animals('pet','white');
// main.about();
// var d1 = new Dog('pet','black','Chicken','barks');

// var d2 = new Dog('pet','white','Chicken','barks');
// var c1= new Cat('wild','tellow','rat','mew');
// var c2= new Cat('pet','black','insect','mew');
// d1.about();
// d1.barking();
// d2.about();
// d2.barking();
// c1.about();
// c1.noise();

module.exports = {animals,Dog,Cat};