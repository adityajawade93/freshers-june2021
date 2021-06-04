function validateAnimal(type,height,food){
    
    if((typeof type === 'string' || type instanceof String)&&(typeof food === 'string' || food instanceof String)&& ( typeof height ==='number')){
        return true;
    }
    else{
        return false;
    }
}

function validateDog(color,breed){
    if((typeof color === 'string' || color instanceof String)&& (typeof breed === 'string' || breed instanceof String)){
        return true;
    }
    else{
        return false;
    }
}

function validateCat(color,isPet){
    if((typeof color === 'string' || color instanceof String)&& (typeof isPet === 'boolean')){
        return true;
    }
    else{
        return false;
    }
}

function Animal(type,height,food){
    
    if(validateAnimal(type,height,food)){
        this.type=type; 
        this.height=height;
        this.food=food;
    }
    else{
        throw "Input Error";
    }
};

Animal.prototype.eating = function() {console.log('Eating '+ this.food)};
Animal.prototype.description= function() {return 'It is of type '+this.type+' and height '+this.height};

// var animal1= new Animal("Reptile",10,'rat');
// animal1.description();
// animal1.eating();


function Dog(type,height,food, color,breed){
    
    if(validateDog(color,breed)){
        this.color=color;
        this.breed=breed;
        Animal.call(this,type,height,food);
    }
    else{
        throw "Input Error"; 
    }
};
Dog.prototype=Object.create(Animal.prototype);
Object.defineProperty(Dog.prototype,'constructor',{
    value: Dog,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true   
});
Dog.prototype.barking= function(){
    return 'A dog of breed '+this.breed+' and color '+this.color+' is barking';
};


function Cat(type,height,food, color, isPet){
    
    if(validateCat(color,isPet)){
        Animal.call(this, type,height,food);
        this.color=color;
        this.isPet=isPet;
    }
    else{
        throw  "Input Error"; 
    }
}
Cat.prototype=Object.create(Animal.prototype);
Object.defineProperty(Cat.prototype,'constructor',{
    value: Cat,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true
});
Cat.prototype.playing=function(){
    return 'The cat of color '+this.color+' is playing';
};

// var d1=new Dog('mammal',5,'Chicken','black','pug');
// var d2= new Dog('mammal',12,'Chicken, dog food','white','x');
// var c1= new Cat('mammal',3,'Rat and insect','pink',false);
// var c2= new Cat('mammal',2,'Rat and milk','white',true);
// d1.description();
// d1.barking();
// d2.description();
// d2.barking();
// c1.description();
// c1.playing();

module.exports={Animal,Cat,Dog};
