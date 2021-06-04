const { binary_search } = require('./binarySearch');

// link - https://jestjs.io/docs/getting-started

// test('should return true when element is present in array', () => { // spec
//     let arr = [1, 3, 5, 7, 8, 9]; // arrange
//     let x = 5; // arrange
//     const found = binary_search(arr, x, 0, arr.length - 1); // act
//     expect(found).toBe("true"); // assert
// });


// test('should return false when element is not present in array', () => {
//     let arr = [1, 3, 5, 7, 8, 9];
//     let x = 6;
//     const found = binary_search(arr, x, 0, arr.length - 1)
//     expect(found).toBe(false);
// });

// test('should return false when element is not present in array', () => {
//     let arr = [1, 3, 5, 7, 8, 9];
//     let x = 6;
//     const found = binary_search(arr, x, 0, arr.length - 1)
//     expect(found).toBe(false);
// });

// test('should return false when input is not present in array', () => {
//     let arr = 1;
//     let x = 6;
//     const found = binary_search(arr, x, 0, arr.length - 1)
//     expect(found).toBe(false);
// });


























describe('Binary Search test cases', () => {
    // let arr;

    beforeEach(() => {
        // arr = [1, 3, 5, 7, 8, 9]
        console.log('------> running beforeEach');
        // runs once before each spec run
    });

    afterEach(() => {
        console.log('------> running afterEach');
        // runs once after each spec run
    });

    beforeAll(() => {
        console.log('------> running beforeAll');
        // runs only once before running any spec
    });
      
    afterAll(() => {
        console.log('------> running afterAll');
        // runs only once after running all spec
    });
  
    test('should return true when element is present in array', () => { // spec
        let arr = [1, 3, 5, 7, 8, 9]; // arrange
        let x = 5; // arrange
        const found = binary_search(arr, x); // act
        expect(found).toBe("true"); // assert
    });
    
    
    test('should return false when element is not present in array', () => {
        let arr = [1, 3, 5, 7, 8, 9];
        let x = 6;
        const found = binary_search(arr, x);
        expect(found).toBe(false);
    });
    
    
    
    test('should return false when input is not a array and values are not equal', () => {
        let arr = 1;
        let x = 6;
        const found = binary_search(arr, x);
        expect(found).toBe(false);
    });

    test('should return true when input is not a array and values are  equal', () => {
        let arr = 1;
        let x = 1;
        const found = binary_search(arr, x);
        expect(found).toBe("true");
    });

    test('should return false when input is undefined', () => {
        let arr = [1, 3, 5, 7, 8, 9];
        let x = undefined;
        const found = binary_search(arr, x);
        expect(found).toBe(false);
    });
    
    test('should return false when input is not a number', () => {
        let arr = [1, 3, 5, 7, 8, 9];
        let x = 'sre';
        const found = binary_search(arr, x);
        expect(found).toBe(false);
    });

});