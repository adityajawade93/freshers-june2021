
const findThirdMax = require("./findThirdMax");
test('find Third highest: Should return third highest number',()=>{
    const array=[2,5,7,1,9,5,8];
    const result=findThirdMax(array);
    expect(result).toStrictEqual(7);
});

test('find Third highest: Should return third highest number',()=>{
    const array=[-2,-5,-7,-1,-9,-10,-8];
    const result=findThirdMax(array);
    expect(result).toStrictEqual(-5);
});

test('find Third highest: Should return error message if array is not provided',()=>{
    const array=[-2,-5,-7,-1,-9,-10,-8];
    const result=findThirdMax();
    expect(result).toStrictEqual("Input Error");
});

test('find Third highest: Should return error message if number is provided instead of array',()=>{
    const array=5;
    const result=findThirdMax(array);
    expect(result).toStrictEqual("Input Error");
});

test('find Third highest: Should return error message if unique elements in array is less than three',()=>{
    const array=[1,2,1,1,2];
    const result=findThirdMax(array);
    expect(result).toStrictEqual("Insufficient elements");
});