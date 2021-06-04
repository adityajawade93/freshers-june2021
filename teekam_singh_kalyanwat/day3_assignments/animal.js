class animal{
    constructor(){}
    legs(){
        console.log('I have four legs');
    }
    tail(){
        console.log('I have a tail');
    }

}

class dog extends animal{
    constructor(){
        super();
    }

    bark(){
        console.log('I bark');
    }
}

class cat extends animal{
    constructor(){
        super();
    }

    meow(){
        console.log('I meow');
    }

}

let a1 = new animal();
a1.tail();

let d1 = new dog();
d1.bark();
d1.legs();

let c1=new cat();
c1.meow();