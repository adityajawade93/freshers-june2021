const { test, expect } = require('@jest/globals');
const flatten = require('./flatten');

test('flatten the given array',()=>{
    const arr = [1, 2, [3, [4, 5, [6]]], 7, 8];
    const array = flatten(arr);
    expect(array).toEqual([1,2,3,4,5,6,7,8]);
});
