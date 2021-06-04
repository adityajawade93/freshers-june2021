const { printDuplicate } = require('./duplicate');

test('should return true when duplicates are found in array', () => { // spec
    let arr = [1, 3, 5, 5, 7, 8, 9]; // arrange
    let ans_arr = [];

    const found = printDuplicate(arr, ans_arr); // act
    expect(found).toBe(true); // assert
});

test('should return false when duplicates are not found in array', () => { // spec
    let arr = [1, 3, 5, 7, 8, 9]; // arrange
    let ans_arr = [];

    const found = printDuplicate(arr, ans_arr); // act
    expect(found).toBe(false); // assert
});

test('should return false when input given is not an array ', () => { // spec
    let arr = null; // arrange
    let ans_arr = [];

    const found = printDuplicate(arr, ans_arr); // act
    expect(found).toBe(false); // assert
});


test('should return false when input given is not an array ', () => { // spec
    let arr = 123; // arrange
    let ans_arr = [];

    const found = printDuplicate(arr, ans_arr); // act
    expect(found).toBe(false); // assert
});

test('should return false when answer array given is not an array ', () => { // spec
    let arr = [1, 3, 5, 7, 8, 9]; // arrange
    let ans_arr = 123;

    const found = printDuplicate(arr, ans_arr); // act
    expect(found).toBe(false); // assert
});