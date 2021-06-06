// JavaScript source code
const { flatten } = require('./flatten');

test('should return true nested array is passed', () => { // spec
    let arr = [[1, 3], [5, 7, 8], [[9, 2, 5, 6]]]; // arrange
    const flattenArray1 = flatten(arr);
    expect(flattenArray1).toStrictEqual([1,3,5,7,8,9,2,5,6])
});

test('flatten: Should return flatten of an array', () => {
    const arr = [[1], []];
    const flattenArray1 = flatten(arr);
    expect(flattenArray1).toStrictEqual([1])
});

