const {Animal,Cat,Dog} = require("./inheritence");
test('Inheitance: Should return proper message',()=>{
    var d1=new Dog('mammal',5,'Chicken','black','pug');
    const result = d1.barking();
    expect(result).toBe("A dog of breed pug and color black is barking");
})

test('Inheitance: Should return proper message',()=>{
    var c1= new Cat('mammal',3,'Rat and insect','pink',false);
    const result = c1.playing();
    expect(result).toBe("The cat of color pink is playing");
})

test('Inheitance: Should return error message',()=>{
    expect(()=> {var c1= new Cat('mammal','Rat and insect','pink',false);}).toThrow("Input Error");
    
})

test('Inheitance: Should return error message',()=>{
    expect(()=> {var c1= new Cat(10,'k','Rat and insect','pink',false);}).toThrow("Input Error");
    
})

test('Inheitance: Should return error message',()=>{
    expect(()=> {var d2= new Dog('mammal',10,'Chicken, dog food','white',5);}).toThrow("Input Error");
    
})