const { thirdLargest } = require('./third_largest');

describe('Find 3rd Largest Elements test cases', () => {
    let arr = [12, 13, 1, 10, 34, 16]

    beforeEach(() => {
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
  
    test('should return invalid input when input is not array', () => {
        let arr = 5
        const found = thirdLargest(arr)
        expect(found).toBe("invalid input");
    });

    test('should return invalid input when input size is less than 3', () => {
        let arr = [5,2]
        const found = thirdLargest(arr)
        expect(found).toBe("invalid input");
    });
    
    test('should return correct element', () => {
        let arr = [12, 13, 1, 10, 34, 16]
        const found = thirdLargest(arr)
        expect(found).toBe(13);
    });

});
