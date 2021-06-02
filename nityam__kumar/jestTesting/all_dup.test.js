const {find_all_duplicate}=require('./all_dup.js');

describe('find all duplicate number test cases', () => {
    

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
  
    
    test('should print no duplicate if there is no duplicate element in a array', () => {
       let arr=[1,2,3,4,5];  
        const found = find_all_duplicate(arr);
        expect(found).toBe("no duplicate");
    });

    test('should print all duplicate element', () => {
        let arr=[1,2,3,4,5,5,3,1]; 
        const found = find_all_duplicate(arr);
        expect(found).toBe("success");
    });

    test('should return invalid when input array is undefined', () => {
        let arr=undefined;  
        const found = find_all_duplicate(arr);
        expect(found).toBe("invalid");
    });
    
    test('should return invalid when input array is not a number', () => {
        let arr="gtry";  
        const found = find_all_duplicate(arr);
        expect(found).toBe("invalid");
    });

});