const fibonacci = require('./fibonacci')

test('should return correct elements and number of elements', () => {
    let v=[0,1,1,2,3,5,8,13,21,34]
    const found=fibonacci(10)
    expect(found).toEqual(expect.arrayContaining(v))
    expect(found.length).toBe(v.length)
});

test('should return empty array if number of terms is 0', () => {
    const found=fibonacci(0)
    expect(found.length).toBe(0)
});

test('should return null if number of terms is <0', () => {
    const found=fibonacci(-4)
    expect(found).toBe(null)
});