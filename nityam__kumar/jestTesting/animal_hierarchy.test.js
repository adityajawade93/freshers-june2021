


const {animal,dog,cat}=require('./animal_hierarchy.js');


describe('animal hierarchy test cases', () => {
  
    test('should return correct info for animal class object', () => { // spec
        let a1=new animal("reptiles","scobra",12,2,false,"fish");
        let dog1=new dog("mammals","bull",26,4,true,"biscuit","white","bark");
        let cat1=new cat("mammals","tom",32,4,false,"milk","black","mew");
        let info=a1.get_animal_info();
        expect(info).toBe("animal datails ::: -> type:reptiles , name:scobra , age:12 , no_of_legs:2 , eats:fish , vegetarian:false"); // assert
    });  

    test('should return correct info for dog class object', () => { // spec
        let a1=new animal("reptiles","scobra",12,2,false,"fish");
        let dog1=new dog("mammals","bull",26,4,true,"biscuit","white","bark");
        let cat1=new cat("mammals","tom",32,4,false,"milk","black","mew");
        let info=dog1.get_dog_info();
        expect(info).toBe("Dog datails ::: -> type:mammals , name:bull , age:26 , no_of_legs:4 , eats:biscuit , vegetarian:true color:white voice:bark"); // assert
    }); 

    test('should return correct info for cat class object', () => { // spec
        let a1=new animal("reptiles","scobra",12,2,false,"fish");
        let dog1=new dog("mammals","bull",26,4,true,"biscuit","white","bark");
        let cat1=new cat("mammals","tom",32,4,false,"milk","black","mew");
        let info=cat1.get_cat_info();
        expect(info).toBe("Cat datails ::: -> type:mammals , name:tom , age:32 , no_of_legs:4 , eats:milk , vegetarian:false color:black voice:mew"); // assert
    });

    test('should return correct info if animal  class function is called from cat class', () => { // spec
        let a1=new animal("reptiles","scobra",12,2,false,"fish");
        let dog1=new dog("mammals","bull",26,4,true,"biscuit","white","bark");
        let cat1=new cat("mammals","tom",32,4,false,"milk","black","mew");
        let info4=cat1.get_animal_info();
        expect(info4).toBe("animal datails ::: -> type:mammals , name:tom , age:32 , no_of_legs:4 , eats:milk , vegetarian:false"); // assert
    });

    test('should return updated name of cat class', () => { // spec
        let a1=new animal("reptiles","scobra",12,2,false,"fish");
        let cat1=new cat("mammals","tom",32,4,false,"milk","black","mew");
        cat1.name="penny";
        let info4=cat1.get_animal_name();
        expect(info4).toBe("name:penny"); // assert
    });

    


});
