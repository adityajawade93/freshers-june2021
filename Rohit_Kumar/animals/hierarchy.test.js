//const { TestWatcher } = require('@jest/core')
const { animals,Dog,Cat} = require('./Hierarchy')

test('give good result', () =>{
    var d1 = new Dog('pet','black','Chicken','barks')
   // const result = d1.barking();
   expect(d1.barking()).toBe('food is Chicken and do barks');
});
