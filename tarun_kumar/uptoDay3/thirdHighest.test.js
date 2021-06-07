const { thirdHighest} = require('./thirdHighest');

test('should return true when we are able to get third highest', () => { // spec
    let arr =[1,2,3,4,5,6,7,8,9]; // arrange
   
    const found = thirdHighest(arr); // act
    expect(found).toBe(true); // assert
});

test('should return fasle when length of array is less than 3', () => { // spec
    let arr =[1,2]; // arrange
  
    const found = thirdHighest(arr); // act
    expect(found).toBe(false); // assert
});

test('should return true when all elements are same in array', () => { // spec
    let arr =[1,1,1,1,1,1,1]; // arrange
    
    const found = thirdHighest(arr); // act
    expect(found).toBe(true); // assert
});

test('should return false when invalid input is given', () => { // spec
    let arr =123; // arrange
   
    const found = thirdHighest(arr); // act
    expect(found).toBe(false); // assert
});

test('should return false when invalid input is given', () => { // spec
    let arr =null; // arrange
   
    const found = thirdHighest(arr); // act
    expect(found).toBe(false); // assert
});