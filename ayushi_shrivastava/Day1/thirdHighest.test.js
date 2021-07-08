const thirdHighest = require('./thirdHighest');

test('thirdHighest function exists', ()=>{
    expect(thirdHighest).toBeDefined();
});

test('thirdHighest in array [1,2,3,4,5,6,7,8,9,10,11]', ()=>{
    const arr = [1,2,3,4,5,6,7,8,9,10,11];
    const num = thirdHighest(arr);

    expect(num).toBe(9);
});