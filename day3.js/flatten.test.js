


const {flatten} = require('./flattenarray');

test('should return flatten array 1', ()=>{
    let arr= [1,[2,[3,4],[5,[6,7]]]]
    
    expect(flatten(arr)).toEqual([1,2,3,4,5,6,7]);
})

test('should return flatten array 2', ()=>{
    let arr= [1,[2,[3,4],[5,[6,7]]],[8,9,10]]
    
    expect(flatten(arr)).toEqual([1,2,3,4,5,6,7,8,9,10]);
})

test('should return flatten array 3', ()=>{
    let arr= [[[[[[[[1],[[[[[2]]]]]]]]]]]]
    
    expect(flatten(arr)).toEqual([1,2]);
})

test('should return flatten array 4', ()=>{
    let arr= [[[[[[[[1],[[[[[2]],[[[[[3]]]]]]]]]]]]]]]
    
    expect(flatten(arr)).toEqual([1,2,3]);
})