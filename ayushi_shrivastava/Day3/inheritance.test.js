const { test, expect } = require('@jest/globals');
const {Cat,Dog} = require('./inheritance');

test('testing dog',()=>{
    let dog = new Dog('dog','black','bark','loyal',3);
    expect(dog.introduction()).toBe("I have 3 puppies!");
    expect(dog.greeting()).toBe("Hii, I am a dog and I am black in color!");
    expect(dog.myActivity()).toBe("I bark!");
    expect(dog.myNature()).toBe("I am loyal!");
});

test('testing cat',()=>{
    let cat = new Cat('cat','white','meow','selfish',4);
    expect(cat.introduction()).toBe("I have 4 kittens!");
    expect(cat.greeting()).toBe("Hii, I am a cat and I am white in color!");
    expect(cat.myActivity()).toBe("I meow!");
    expect(cat.myNature()).toBe("I am selfish!");
});
