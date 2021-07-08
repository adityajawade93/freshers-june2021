const binarySearch = require('./binarySearch');

test('binarySearch function exists', ()=>{
    expect(binarySearch).toBeDefined();
});

test('binarySearch for 7 ', ()=>{
    const arr = [1,2,3,4,5,6,7,8,9,10,11];
    const num = 7;
    const index = binarySearch(arr,0,10,7);

    expect(index).toBe(6);
});