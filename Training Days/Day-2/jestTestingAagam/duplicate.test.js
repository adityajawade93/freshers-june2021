const { printRepeating } = require('./duplicate');

describe('Find Duplicate Elements test cases', () => {
    let arr = [ 1, 2, 3, 1, 3, 6, 6 ]

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
        let arr = 5;
        const found = printRepeating(arr)
        expect(found).toBe("invalid input");
    });
    
    test('should return correct duplicate elements', () => {
        const found = printRepeating(arr)
        const result = [ 1, 3, 6 ]
        expect(found).toStrictEqual(result);
    });

});
