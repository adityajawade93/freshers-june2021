// const ab = 20;
// function outer() {
//     const abc = 20;
//     const b = 20;
//     function inner() {
//         if(true){
//             let a = 10;
//             console.log(a);
//         }
//         console.log(b, abc);
//         console.log(ab);
//     }
//     return inner;
// }

//outer();

// function abcd (){
//     const innerFun = outer();
//     innerFun();
//     //innerFun();
// }
//  abcd();

// const innerFun = outer();
// innerFun();
// innerFun();
// console.log(ab);

// scope
// global 
// function 
// block // if, for, while .... let, const are block
// var, let, const


// top level abc 
        // outer execution abc, b
                // inner
// innerFub decalred has a ref inner                
// innerFun execution 
                        // if block a
                    // a  not accessable

const obj = {
    name: "anoop",
    sayName: function(){
        console.log(this.name);
    }
}

const obj2 = {
    name: "anoop2",
    sayName2: function(){
        console.log(this.name);
    }
}

 



const sayName = obj.sayName;
const sayName2 = obj2.sayName2;
sayName2(); // prints undefined
sayName(); // prints undefined
// this.name = 'arnub';
// sayName2(); // prints arnub
// sayName(); // prints arnub

const sayNameBind = obj.sayName.bind(obj);
const sayName2Bind = obj2.sayName2.bind(obj2);

// this.name = 'arnub';

sayNameBind(); // annop
sayName2Bind(); // anoop2