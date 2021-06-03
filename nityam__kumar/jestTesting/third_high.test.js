
const {third_highest_number}=require('./third_high.js');

describe('third highest number test cases', () => {
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
  
    test('should return mot found input arr size when is less than 3', () => { // spec
        let arr=[1];
        const found = third_highest_number(arr); // act
        expect(found).toBe("not found"); // assert
    });
    
    test('should return mot found when input array does not have third highest number', () => { // spec
        let arr=[1,2,2,1];
        const found = third_highest_number(arr); // act
        expect(found).toBe("not found"); // assert
    });
    
    test('should print third maximum element in case of valid input array', () => {
       let arr=[1,2,3,4,5];  
        const found = third_highest_number(arr);
        expect(found).toBe(3);
    });

    test('should return invalid when input is not a array', () => {
        let arr=1;  
        const found = third_highest_number(arr);
        expect(found).toBe("invalid");
    });

    test('should return invalid when input is undefined', () => {
        let arr=undefined;  
        const found = third_highest_number(arr);
        expect(found).toBe("invalid");
    });
    
    test('should return invalid when input is not a number', () => {
        let arr="gtry";  
        const found = third_highest_number(arr);
        expect(found).toBe("invalid");
    });

});

