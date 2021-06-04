class Animal{
    constructor(type,height,food){
        this.type=type;
        this.height=height;
        this.food=food;
    }
    description(){
        console.log('It is of type '+this.type+' and height '+this.height)
    }
}

class Dog extends Animal{
    constructor(type,height,food,color,breed){
        super(type,height,food);
        this.color=color;
        this.breed=breed;
    }
    barking(){
        console.log('A dog of breed '+this.breed+' and color '+this.color+' is barking');
    }
}

class Cat extends Animal{
    constructor(type,height,food, color, isPet){
        super(type,height,food);
        this.color=color;
        this.isPet=isPet;
    }
    playing(){
        console.log('The cat of color '+this.color+' is playing')
    }
}

var animal1= new Animal("Reptile",10,'rat');
animal1.description();

var d1=new Dog('mammal',5,'Chicken','black','pug');
var d2= new Dog('mammal',12,'Chicken, dog food','white','x');
var c1= new Cat('mammal',3,'Rat and insect','pink',false);
var c2= new Cat('mammal',2,'Rat and milk','white',true);
d1.description();
d1.barking();
d2.description();
d2.barking();
c1.description();
c1.playing();