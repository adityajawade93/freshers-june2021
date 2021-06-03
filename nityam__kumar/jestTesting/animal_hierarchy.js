
class animal{

    constructor(type,name,age,no_of_legs,vegetarian,food){
        this.type=type;
        this.name=name;
        this.age=age;
        this.no_of_legs=no_of_legs;
        this.vegetarian=vegetarian;
        this.eats=food;
    }

    get_animal_info(){
        console.log(`animal datails ::: -> type:${this.type} , name:${this.name} , age:${this.age} , no_of_legs:${this.no_of_legs} , eats:${this.eats} , vegetarian:${this.vegetarian}`);
        let temp=`animal datails ::: -> type:${this.type} , name:${this.name} , age:${this.age} , no_of_legs:${this.no_of_legs} , eats:${this.eats} , vegetarian:${this.vegetarian}`;
        return temp;
    }

    get_animal_name(){
        console.log(`name:${this.name}`);
        return `name:${this.name}`;
    }

    get_animal_type(){
        console.log(`type:${this.type}`);
        return `type:${this.type}`;
    }

    get_animal_age(){
        console.log(`age:${this.age}`);
        return `age:${this.age}`;
    }

    get_animal_legs(){
        console.log(`no_of_legs:${this.no_of_legs}`);
        return `no_of_legs:${this.no_of_legs}`;
    }

    get_is_animal_vegetarian(){
        console.log(`vegetarian:${this.vegetarian}`);
        return `vegetarian:${this.vegetarian}`;
    }

    get_animal_food(){
        console.log(`animal eats:${this.eats}`);
        return `animal eats:${this.eats}`;
    }


}

class dog extends animal{
    constructor (type,name,age,no_of_legs,food,vegetarian,color,voice){
        super(type,name,age,no_of_legs,food,vegetarian);
        this.color=color;
        this.voice=voice;
    }
    get_dog_info(){
        console.log(`Dog datails ::: -> type:${this.type} , name:${this.name} , age:${this.age} , no_of_legs:${this.no_of_legs} , eats:${this.eats} , vegetarian:${this.vegetarian} color:${this.color} voice:${this.voice}`);
        let temp=`Dog datails ::: -> type:${this.type} , name:${this.name} , age:${this.age} , no_of_legs:${this.no_of_legs} , eats:${this.eats} , vegetarian:${this.vegetarian} color:${this.color} voice:${this.voice}`
        return temp;
    }

    get_dog_voice(){
        console.log(`Dog voice:${this.voice}`);
        return `Dog voice:${this.voice}`;
    }

    get_dog_color(){
        console.log(`Dog color:${this.color}`);
        return `Dog color:${this.color}`;
    }
   
}

class cat extends animal{
    constructor (type,name,age,no_of_legs,food,vegetarian,color,voice){
        super(type,name,age,no_of_legs,food,vegetarian);
        this.color=color;
        this.voice=voice;
    }
    get_cat_info(){
        console.log(`Cat datails ::: -> type:${this.type} , name:${this.name} , age:${this.age} , no_of_legs:${this.no_of_legs} , eats:${this.eats} , vegetarian:${this.vegetarian} color:${this.color} voice:${this.voice}`);
        let  temp=`Cat datails ::: -> type:${this.type} , name:${this.name} , age:${this.age} , no_of_legs:${this.no_of_legs} , eats:${this.eats} , vegetarian:${this.vegetarian} color:${this.color} voice:${this.voice}`;
        return temp;
    }
    
    get_cat_voice(){
        console.log(`Cat voice:${this.voice}`);
        return `Cat voice:${this.voice}`;
    }

    get_cat_color(){
        console.log(`Cat color:${this.color}`);
        return `Cat color:${this.color}`;
    }
}

let a1=new animal("reptiles","scobra",12,2,false,"fish");

let dog1=new dog("mammals","bull",26,4,true,"biscuit","white","bark");
let cat1=new cat("mammals","tom",32,4,false,"milk","black","mew");
let info=a1.get_animal_info();
let info2=dog1.get_dog_info();
let info3=cat1.get_cat_info();
let info4=cat1.get_animal_info();
// console.log(info2);
// console.log(info3);
// console.log(info4);
// dog1.get_dog_info();
// cat1.get_cat_info();
// a1.name="jaguar";
// a1.get_animal_info();
// cat1.name="jerry";
// cat1.voice="shoo";
// cat1.get_animal_info();

module.exports={animal,dog,cat};
