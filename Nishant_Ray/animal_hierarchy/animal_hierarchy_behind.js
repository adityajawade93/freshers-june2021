function animal(name,breed,weight){
    this.name=name;
    this.breed=breed;
    this.weight=weight;
}
animal.prototype.animal_name=function(){ 
    console.log("this animal's name is "+this.name)
}

animal.prototype.animal_breed=function(){
    console.log("this animal's breed is "+this.breed);
}

animal.prototype.animal_weight=function(){
    console.log("this animal's breed is "+this.weight);
}

function dog(name,breed,weight,sound){
    animal.call(this,name,breed,weight);
    this.sound=sound;
}

dog.prototype=Object.create(animal.prototype);

Object.defineProperty(dog.prototype, 'constructor', {
     value: dog,
       enumerable: false, 
       writable: true });

dog.prototype.mysound=function(){
    console.log("i am dog any my sound is "+this.sound);
}

function cat(name,breed,weight,food){
    animal.call(this,name,breed,weight);
    this.food=food;
}

cat.prototype=Object.create(animal.prototype);

Object.defineProperty(cat.prototype, 'constructor', {
     value: cat,
       enumerable: false, 
       writable: true });

cat.prototype.fav_food=function(){
    console.log("i am cat and my favourite food is "+this.food);
}


let animal_1=new dog("fuzz","german sheperd",55,"bhow bhow");
let animal_2=new cat("billi","breed",25,"mouse");

animal_1.animal_name();
animal_1.animal_breed();
animal_1.animal_weight();
animal_1.mysound();

animal_2.animal_name();
animal_2.animal_breed();
animal_2.animal_weight();
animal_2.fav_food();

module.exports=cat;
