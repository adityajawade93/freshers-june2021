const { printFibonacci } = require('./fibonacci');

test('should return true when we are able to print fibonacci series', () => { // spec
    let number =5; // arrange
    const found = printFibonacci(number); // act
    expect(found).toBe(true); // assert
});

test('should return false when given number is not a number', () => { // spec
    let number =[]; // arrange
    const found = printFibonacci(number); // act
    expect(found).toBe(false); // assert
});

test('should return false when given number is not a number', () => { // spec
    let number =null; // arrange
    const found = printFibonacci(number); // act
    expect(found).toBe(false); // assert
});

test('should return false when given number is not a number', () => { // spec
    let number ='hello'; // arrange
    const found = printFibonacci(number); // act
    expect(found).toBe(false); // assert
});