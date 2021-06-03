class animal{
    constructor(name,breed,weight){
        this.name=name;
        this.breed=breed;
        this.weight=weight;
    }

    animal_name(){
        console.log("this animal's name is "+this.name);
    }

    animal_breed(){
        console.log("this animal's breed is "+this.breed);
    }

    animal_weight(){
        console.log("this animal's weight is "+this.weight);
    }
     
}
class dog extends animal{
    constructor(name,breed,weight,sound){
        super(name,breed,weight);
        this.sound=sound;
    }

    mysound(){
        console.log("i am dog any my sound is "+this.sound);
    }
}

class cat extends animal{
    constructor(name,breed,weight,food){
        super(name,breed,weight);
        this.food=food;
    }
    fav_food(){
        console.log("i am cat and my favourite food is "+this.food);
    }
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

module.exports={cat,dog};