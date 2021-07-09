const { third } = require('./third');
test('should return the third largest element', () => { // spec
    let arr = [1, 3, 5, 7, 8, 9]; // arrange
    let x = 6; // arrange
    var f = third(arr, x); // act
    expect(f).toBe(7); // assert
});


test('should return the third largest element when array is unsorted with dublicate entries', () => { // spec
    let arr = [1, 3, 5,4,4,7,10, 7, 8, 9]; // arrange
    let x = 10; // arrange
    var f = third(arr, x); // act
    expect(f).toBe(8); // assert
});


test('should return the third largest element when array is unsorted with dublicate entries and all negative entries', () => { // spec
    let arr = [-1, -3, -5, -4, -4, -7, -10, -7, -8, -9]; // arrange
    let x = 10; // arrange
    var f = third(arr, x); // act
    expect(f).toBe(-4); // assert
});

test('should return the third largest element when array is unsorted with dublicate entries and few negative entries', () => { // spec
    let arr = [1, -3, 5, -4, 4, -7, 10, -7, 8, -9]; // arrange
    let x = 10; // arrange
    var f = third(arr, x); // act
    expect(f).toBe(5); // assert
});