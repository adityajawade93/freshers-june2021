const {flat_array}=require('./flat_nested_loops.js');

describe('flat nested  array  test cases', () => {
    test('should return  correct value for valid input', () => { // spec
        let arr2 = [
            1,
            2,
            [3, 4],
            [
              [5, 6],
              7
            ],
            8,
            9
          ]; 
        const found = flat_array(arr2); // act
        expect(found).toStrictEqual([1,2,3,4,5,6,7,8,9]); // assert
    });

    test('should return  empty value for empty input', () => { // spec
        let arr2 = [
          ]; 
        const found = flat_array(arr2); // act
        expect(found).toStrictEqual([]); // assert
    });

    test('should return  invalid input when input is not an array', () => { // spec
        let arr2 = "43";
        let arr3=1;
        const found = flat_array(arr2); // act
        expect(found).toBe("invalid input"); // assert
    });

    test('should return empty when input array is empty', () => { // spec
        let arr2 = [[]];
        const found = flat_array(arr2); // act
        expect(found).toStrictEqual([]);; // assert
    });



});