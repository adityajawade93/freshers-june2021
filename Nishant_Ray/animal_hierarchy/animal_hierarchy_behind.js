function Animal(name,breed,weight){
    this.name=name;
    this.breed=breed;
    this.weight=weight;
}
Animal.prototype.animal_name=function(){ 
    return "this animal name is "+this.name;
}

Animal.prototype.animal_breed=function(){
    return "this animal breed is "+this.breed;
}

Animal.prototype.animal_weight=function(){
    return this.weight;
}

function Dog(name,breed,weight,sound){
    Animal.call(this,name,breed,weight);
    this.sound=sound;
}

Dog.prototype=Object.create(Animal.prototype);

Object.defineProperty(Dog.prototype, 'constructor', {
     value: Dog,
       enumerable: false, 
       writable: true });

Dog.prototype.mysound=function(){
    return "i am dog and my sound is "+this.sound;
}

function Cat(name,breed,weight,food){
    Animal.call(this,name,breed,weight);
    this.food=food;
}

Cat.prototype=Object.create(Animal.prototype);

Object.defineProperty(Cat.prototype, 'constructor', {
     value: Cat,
       enumerable: false, 
       writable: true });

Cat.prototype.fav_food=function(){
    return "i am cat and my favourite food is "+this.food;
}


let animal_1=new Dog("fuzz","german sheperd",55,"bhow bhow");
let animal_2=new Cat("billi","breed",25,"mouse");

console.log(animal_1.animal_name());
console.log(animal_1.animal_breed());
console.log(animal_1.animal_weight());
console.log(animal_1.mysound());

console.log(animal_2.animal_name());
console.log(animal_2.animal_breed());
console.log(animal_2.animal_weight());
console.log(animal_2.fav_food());

module.exports={Animal,Dog,Cat};
