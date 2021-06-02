const { dublicate } = require('./dublicate');

test('should return true when there are dublicates in the array', () => { // spec
    let arr = [1, 3, 5, 7, 8, 9,2,5,6]; // arrange
    const found = dublicate(arr); // act
    expect(found).toBe("true"); // assert
});

test('should return true when there are dublicates in the array', () => { // spec
    let arr = [1, 3, 5, 7, 8, 9, 2, 4, 6]; // arrange
    const found = dublicate(arr); // act
    expect(found).toBe("false"); // assert
});