const flatten =require("./flatten");
    // let arr= [
    //   1,
    //   2,
    //   [3, 4],
    //   [
    //     [5, 6],
    //     7
    //   ],
    //   8,
    //   9
    // ]

const {Animal,Cat,Dog} = require("./inheritence");
// var a1=new Animal(7,5,'Chicken');
// a1.description();

var d1=new Dog('mammal','Chicken','black','pug');
var d2= new Dog('mammal',12,'Chicken, dog food','white','x');
var c1= new Cat('mammal',3,'Rat and insect','pink',false);
var c2= new Cat('mammal',2,'Rat and milk','white',true);
d1.description();
d1.barking();
d2.description();
d2.barking();
c1.description();
c1.playing();