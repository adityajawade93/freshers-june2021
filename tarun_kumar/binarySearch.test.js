const { binarySearch } = require('./binarySearch');

test('should return true when element is present in array', () => { // spec
    let arr = [1, 3, 5, 7, 8, 9]; // arrange
    let key = 5; // arrange
    const found = binarySearch(arr, 0, arr.length - 1, key); // act
    expect(found).toBe(true); // assert
});

test('should return false when element is not present in array', () => {
    let arr = [1, 3, 5, 7, 8, 9];
    let key = 6;
    const found = binarySearch(arr, 0, arr.length - 1, key)
    expect(found).toBe(false);
});

test('should return false when input given is not an array', () => {
    let arr = 1;
    let key = 6;
    const found = binarySearch(arr, 0, arr.length - 1, key)
    expect(found).toBe(false);
});

test('should return true when key is found even if array lenght is even', () => {
    let arr = [1, 3, 5, 7, 8, 9, 10, 11];
    let key = 3;
    const found = binarySearch(arr, 0, arr.length - 1, key)
    expect(found).toBe(true);
});

test('should return true when key is found even if array lenght is odd', () => {
    let arr = [1, 3, 5, 7, 8, 9];
    let key = 8;
    const found = binarySearch(arr, 0, arr.length - 1, key)
    expect(found).toBe(true);
});

test('should return false when key invalid or undefined', () => {
    let arr = [1, 3, 5, 7, 8, 9];
    let key = null;
    const found = binarySearch(arr, 0, arr.length - 1, key)
    expect(found).toBe(false);
});


