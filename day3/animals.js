// class animal{
//     constructor(vegetarian,sound,noOflegs){
//         this.vegetarian=vegetarian;
//         this.sound=sound;
//         this.noOflegs=noOflegs
//     }

//     isvegetarian(vegetarian){
//         if(this.vegetarian){
//             console.log('i am vegetarian')
//         }
//         else{
//             console.log('i am not vegetarian')
//         }
//     }

//     havesound(sound){
//         console.log('i have a sound' + this.sound);
//     }

//     havenoOflegs(noOflegs){
//         console.log('i have a sound' + this.sound);
//     }
// }

// class 

// const obj = {
//     name: "anoop",
//     sayName: function(){
//         console.log(this.name);
//     }
// }

// const obj2 = {
//     name: "anoop2",
//     sayName2: function(){
//         console.log(this.name);
//     }
// }
// console.log(obj.sayName()); /// output anoop
// console.log(name); // anoop

// const sayName = obj.sayName;
// const sayName2 = obj2.sayName2;
// sayName2(); // prints undefined
// sayName(); // prints undefined
// this.name = 'arnub';
// sayName2(); // prints arnub
// sayName(); // prints arnub

// const sayNameBind = obj.sayName.bind(obj);
// const sayName2Bind = obj2.sayName2.bind(obj2);

// this.name = 'arnub';

// sayNameBind(); // annop
// sayName2Bind(); // anoop2
