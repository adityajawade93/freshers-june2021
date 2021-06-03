
const {fibonacci_series}=require('./fibonaci.js');

describe('Fibonacci Series test cases', () => {
    // let arr;

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
  
    test('should return invalid input when element is less than or equal to zero ', () => { // spec
        
        let x = -5; // arrange
        const found = fibonacci_series(x); // act
        expect(found).toBe("invalid input"); // assert
    });
    
    
    test('should print all fibonaccci series upto n', () => {
       
        let x = 7;
        const found = fibonacci_series(x);
        expect(found).toStrictEqual([0,1,1,2,3,5,8]);
    });

    

    test('should return invalid when input is undefined', () => {
        let x=undefined;  
        const found = fibonacci_series(x);
        expect(found).toBe("invalid");
    });
    
    test('should return invalid when input is not a number', () => {
        let xh='gtry';  
        const found = fibonacci_series(xh);
        expect(found).toBe("invalid");
    });
    
    
    
    

});

