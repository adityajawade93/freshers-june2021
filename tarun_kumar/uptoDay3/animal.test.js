const { Animal, Dog, Cat } = require('./animal.js');

test('should check if animal object is created or not', () => { // spec

    let animal = new Animal('henry', 6)
    expect(animal).toEqual({ name: 'henry', age: 6 }); // assert
});

test('should check if Dog object is created or not', () => { // spec

    let dog = new Dog('tommy', 5, 'pitbull', 'brown', true);
    expect(dog).toEqual({
        name: 'tommy',
        age: 5,
        breed: 'pitbull',
        color: 'brown',
        isVaccinated: true
      }); // assert
});

test('should check if Cat object is created or not', () => { // spec

    let cat = new Cat('lucy', 2, 'persian', 'white', true);
    expect(cat).toEqual({
        name: 'lucy',
        age: 2,
        breed: 'persian',
        color: 'white',
        isVaccinated: true
      }); // assert
});


test('should check if animal.getName() works or not', () => { // spec

    let animal = new Animal('henry', 6)
    expect(animal.getName()).toMatch(`Name of animal is ${animal.name}.`); // assert
});


test('should check if cat.getName() works or not', () => { // spec

    let cat = new Cat('lucy', 2, 'persian', 'white', false);
    expect(cat.getName()).toMatch(`Name Of Cat is ${cat.name}`); // assert
});


test('should check if dog.getName() works or not', () => { // spec

    let dog = new Dog('tommy', 5, 'pomerian', 'brown', true);
    expect(dog.getName()).toMatch(`Name Of Dog is ${dog.name}`); // assert
});





