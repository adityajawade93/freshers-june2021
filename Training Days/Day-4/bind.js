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
console.log(obj.sayName()); /// output anoop
// console.log(name); // anoop

const sayName = obj.sayName;
const sayName2 = obj2.sayName2;
sayName2(); // prints undefined
sayName(); // prints undefined
this.name = 'aagam';
sayName2(); // prints aagam
sayName(); // prints aagam

const sayNameBind = obj.sayName.bind(obj);
const sayName2Bind = obj2.sayName2.bind(obj2);

this.name = 'aagam';

sayNameBind(); // annop
sayName2Bind(); // anoop2