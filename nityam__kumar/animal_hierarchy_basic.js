function animal(type,name,age,no_of_legs,vegetarian,food) {
    this.type=type;
    this.name=name;
    this.age=age;
    this.no_of_legs=no_of_legs;
    this.vegetarian=vegetarian;
    this.eats=food;

}
    
    animal.prototype.get_animal_info = function(){
        console.log(`animal datails ::: -> type:${this.type} , name:${this.name} , age:${this.age} , no_of_legs:${this.no_of_legs} , eats:${this.eats} , vegetarian:${this.vegetarian}`);
    }

    animal.prototype.get_animal_name=function(){
        console.log(`name:${this.name}`);
    }

    animal.prototype.get_animal_age=function(){
        console.log(`age:${this.age}`);
    }

    animal.prototype.get_animal_food=function(){
        console.log(`animal eats:${this.eats}`);
    }

    animal.prototype.get_animal_legs=function(){
        console.log(`no_of_legs:${this.no_of_legs}`);
    }

    animal.prototype.get_animal_type=function(){
        console.log(`type:${this.type}`);
    }

    animal.prototype.get_is_animal_vegetarian=function(){
        console.log(`vegetarian:${this.vegetarian}`);;
    }

    
//dog


    function dog(type,name,age,no_of_legs,food,vegetarian,color,voice) {
      animal.call(this,type,name,age,no_of_legs,food,vegetarian)
      this.color=color;
      this.voice=voice;
    }
    
    dog.prototype = Object.create(animal.prototype)
    
    Object.defineProperty(dog.prototype, 'constructor', {
      value: dog,
      enumerable: false, // so that it does not appear in 'for in' loop
      writable: true });
    

    dog.prototype.get_dog_info = function () {
        console.log(`Dog datails ::: -> type:${this.type} , name:${this.name} , age:${this.age} , no_of_legs:${this.no_of_legs} , eats:${this.eats} , vegetarian:${this.vegetarian} color:${this.color} voice:${this.voice}`);
    }

    dog.prototype.get_dog_voice=function(){
        console.log(`Dog voice:${this.voice}`);
    }

    dog.prototype.get_dog_color=function(){
        console.log(`Dog color:${this.color}`);
    }


    //cat

    function cat(type,name,age,no_of_legs,food,vegetarian,color,voice) {
        animal.call(this,type,name,age,no_of_legs,food,vegetarian)
        this.color=color;
        this.voice=voice;
      }
      
      cat.prototype = Object.create(animal.prototype)
      
      Object.defineProperty(cat.prototype, 'constructor', {
        value: cat,
        enumerable: false, // so that it does not appear in 'for in' loop
        writable: true });
      
  
      cat.prototype.get_cat_info = function () {
        console.log(`Cat datails ::: -> type:${this.type} , name:${this.name} , age:${this.age} , no_of_legs:${this.no_of_legs} , eats:${this.eats} , vegetarian:${this.vegetarian} color:${this.color} voice:${this.voice}`);
      }
    
      cat.prototype.get_cat_voice=function(){
        console.log(`Cat voice:${this.voice}`);
      }

      cat.prototype.get_cat_color=function(){
        console.log(`Cat color:${this.color}`);
      }




      let a1=new animal("reptiles","scobra",12,2,false,"fish");
      
      let dog1=new dog("mammals","bull",26,4,true,"biscuit","white","bark");
      let cat1=new cat("mammals","tom",32,4,false,"milk","black","mew");
      a1.get_animal_info();
      dog1.get_dog_info();
      cat1.get_cat_info();
      a1.name="jaguar";
      a1.get_animal_info();
      a1.get_animal_type();
      cat1.name="jerry";
      cat1.voice="shoo";
      cat1.get_animal_info();




    
    