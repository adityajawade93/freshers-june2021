const duplicate = require('./duplicate')

test('should return correct element and number of elements when duplicate element is present', () => {
    let v=[1,2,3,4,4,5,6,7]
    const found=duplicate(v)
    expect(found).toContain(4)
    expect(found.length).toBe(1)
});

test('should work if more than one duplicate elements', () => {
    let v=[1,2,3,4,4,5,5,6,7]
    const found=duplicate(v)
    expect(found).toContain(4)
    expect(found).toContain(5)
    expect(found.length).toBe(2)
});

test('should return empty array when no duplicate is present', () => {
    let v=[1,2,3,4,5,6,7]
    const found=duplicate(v)
    expect(found.length).toBe(0)
});

test('should return null if array is empty', () => {
    let v=[]
    const found=duplicate(v)
    expect(found).toBe(null)
});

test('should return null if argument passed is not an array', () => {
    let v={"hi":1}
    const found=duplicate(v)
    expect(found).toBe(null)
});