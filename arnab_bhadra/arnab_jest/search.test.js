
const search = require("./search");

test('binary Search: Should return true when element is present', ()=>{
    let array=[1,2,3,4,5,6];
    let key=5;
    const result=search.iterativeBinarySearch(array,key);
    expect(result).toBe(true);
});

test('binary Search: Should return true when element is present', ()=>{
    let array=[1,2,3,4,5];
    let key=2;
    const result=search.iterativeBinarySearch(array,key);
    expect(result).toBe(true);
});

test('binary Search: Should return false when element is not present', ()=>{
    let array=[1,2,3,4,5];
    let key=20;
    const result=search.iterativeBinarySearch(array,key);
    expect(result).toBe(false);
});

test('binary Search: Should return message when element is not provided', ()=>{
    let array=[1,2,3,4,5];
    let key=2;
    const result=search.iterativeBinarySearch(array);
    expect(result).toBe("Input Error");
});

test('binary Search: Should return message when array is provided', ()=>{
    let array=1;
    let key=2;
    const result=search.iterativeBinarySearch(array,key);
    expect(result).toBe("Input Error");
});

// Linear search test cases
test('linear Search: Should return true when element is present', ()=>{
    let array=[1,5,12,4,6,1];
    let key=5;
    const result=search.linearSearch(array,key);
    expect(result).toBe(true);
});

test('linear Search: Should return true when element is present', ()=>{
    let array=[1,2,3,4,5];
    let key=2;
    const result=search.linearSearch(array,key);
    expect(result).toBe(true);
});

test('linear Search: Should return false when element is not present', ()=>{
    let array=[1,22,30,7,5];
    let key=20;
    const result=search.linearSearch(array,key);
    expect(result).toBe(false);
});

test('linear Search: Should return message when element is not provided', ()=>{
    let array=[1,2,3,4,5];
    let key=2;
    const result=search.linearSearch(array);
    expect(result).toBe("Input Error");
});

test('linear Search: Should return message when array is provided', ()=>{
    let array=1;
    let key=2;
    const result=search.linearSearch(array,key);
    expect(result).toBe("Input Error");
});