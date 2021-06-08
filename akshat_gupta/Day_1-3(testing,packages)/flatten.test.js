const flatten = require('./flatten')

test('should return correct elements and number of elements', () => {
    let v=[0,1,[1,2,3],[[5]],[[8,13],21],34,[]]
    let ans=[0,1,1,2,3,5,8,13,21,34]
    const found = flatten(v)
    expect(found).toEqual(expect.arrayContaining(ans))
    expect(found.length).toBe(ans.length)
});

test('should return null if outermost structure is not an array', () => {
    let v={1:[0,1,[1,2,3],[[5]],[[8,13],21],34,[]]}
    let ans=[0,1,1,2,3,5,8,13,21,34]
    const found = flatten(v)
    expect(found).toBe(null)
});