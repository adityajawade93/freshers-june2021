class Animal{
    constructor(name,color,activity,nature){
        this.name = name;
        this.color = color;
        this.activity = activity;
        this.nature = nature
    }
}
Animal.prototype.greeting = function() {
    let str = `Hii, I am a ${this.name} and I am ${this.color} in color!`;
    return str;
};
Animal.prototype.myActivity = function() {
    let str = `I ${this.activity}!`;
    return str;
};
Animal.prototype.myNature = function(){
    let str = `I am ${this.nature}!`;
    return str;
};

class Dog extends Animal{
    constructor(name,color,activity,nature,puppies){
        super(name,color,activity,nature);
        this.puppiesNumber = puppies
    }

    introduction(){
        let str = `I have ${this.puppiesNumber} puppies!`;
        return str;
    }
}
Dog.prototype = Object.create(Animal.prototype);

class Cat extends Animal{
    constructor(name,color,activity,nature,kittens){
        super(name,color,activity,nature);
        this.kittensNumber = kittens
    }
    introduction(){
        let str = `I have ${this.kittensNumber} kittens!`;
        return str;
    }
}
Cat.prototype = Object.create(Animal.prototype);

module.exports = {Animal,Cat,Dog};
