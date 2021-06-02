const { recursiveFunction } = require('./binarySearch');

//link - https://jestjs.io/docs/getting-started

test('should return true when element is present in array', () => { // spec
    let arr = [1, 3, 5, 7, 8, 9]; // arrange
    let x = 5; // arrange
    const found = recursiveFunction(arr, x, 0, arr.length - 1); // act
    expect(found).toBe(true); // assert
});


test('should return false when element is not present in array', () => {
    let arr = [1, 3, 5, 7, 8, 9];
    let x = 6;
    const found = recursiveFunction(arr, x, 0, arr.length - 1)
    expect(found).toBe(false);
});

// 1. input is not array
// 2. key is undefined
// 3. odd number of elements
// 4. any other cases
test('should return false invalid input when input is not an array', () => {
    let arr = 10;
    let x = 6;
    const found = recursiveFunction(arr, x, 0, arr.length - 1)
    expect(found).toBe('invalid input');
});

test('should return appropriate result when odd number of elements', () => {
    let arr = [1, 3, 5, 7, 8, 9, 10];
    let x = 5;
    const found = recursiveFunction(arr, x, 0, arr.length - 1)
    expect(found).toBe(true);
});













