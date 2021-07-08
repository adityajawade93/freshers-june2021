const duplicate = require('./duplicate');

test('duplicate function exists', ()=>{
    expect(duplicate).toBeDefined();
});

test('duplicate values in given array ', ()=>{
    const array = [1,2,3,4,4,5,6,7,7,7];
    const values = duplicate(array);

    expect(values).toEqual([4,7]);
});