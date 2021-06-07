const { fibonacci } = require('./fibonacci');


describe('Fibonacci test cases', () => {

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
  
    test('should return invalid input when input is negative', () => {
        let n = -5;
        const found = fibonacci(n)
        expect(found).toBe("invalid input");
    });
    
    test('should return correct duplicate elements', () => {
        let n = 5;
        const found = fibonacci(n)
        expect(found).toBe(5);
    });

});