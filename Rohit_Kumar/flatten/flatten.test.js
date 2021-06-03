const flatArr = require('./flatten');
const funFlat = require('./flatten');


test('flatten array is found',() =>{
    let arr = [1,2,[3,4,[5,6],7],8];
    
    expect(flatArr(arr)).toEqual([1,2,3,4,5,6,7,8]);
})