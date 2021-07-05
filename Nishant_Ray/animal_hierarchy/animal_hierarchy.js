class Animal{
    constructor(name,breed,weight){
        this.name=name;
        this.breed=breed;
        this.weight=weight;
    }

    animal_name(){
        console.log("this animal name is "+this.name);
        return this.name;
    }

    animal_breed(){
        console.log("this animal breed is "+this.breed);
        return this.breed;
    }

    animal_weight(){
        console.log(this.weight);
        return this.weight;
    }
     
}
class Dog extends Animal{
    constructor(name,breed,weight,sound){
        super(name,breed,weight);
        this.sound=sound;
    }

    mysound(){
        console.log("i am dog any my sound is "+this.sound);
    }
}

class Cat extends Animal{
    constructor(name,breed,weight,food){
        super(name,breed,weight);
        this.food=food;
    }
    fav_food(){
        console.log("i am cat and my favourite food is "+this.food);
    }
}

let animal_1=new Dog("fuzz","german sheperd",55,"bhow bhow");
let animal_2=new Cat("billi","breed",25,"mouse");

animal_1.animal_name();
animal_1.animal_breed();
animal_1.animal_weight();
animal_1.mysound();

animal_2.animal_name();
animal_2.animal_breed();
animal_2.animal_weight();
animal_2.fav_food();

