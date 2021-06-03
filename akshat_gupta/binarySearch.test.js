const binarySearch = require('./binarySearch')

test('should return true when element is present', () => {
    let v=[1,2,3,4,5,6,7]
    let target=6
    const found=binarySearch(v,target)
    expect(found).toBe(true);
});

test('should return false when element is not present', () => {
    let v=[1,2,3,4,5,6,7]
    let target=20
    const found=binarySearch(v,target)
    expect(found).toBe(false);
});

test('should return null when array is empty', () => {
    let v=[]
    let target=6
    const found=binarySearch(v,target)
    expect(found).toBe(null);
});

test('should return null when target is not an integer', () => {
    let v=[1,2,3,4,5]
    let target="hi"
    const found=binarySearch(v,target)
    expect(found).toBe(null);
});

test('should return true when array is even sized', () => {
    let v=[1,2,3,4,5,6]
    let target=4
    const found=binarySearch(v,target)
    expect(found).toBe(true);
});

test('should return true when target found at end', () => {
    let v=[1,2,3,4,5,6]
    let target=6
    const found=binarySearch(v,target)
    expect(found).toBe(true);
});

test('should return true when target found at start', () => {
    let v=[1,2,3,4,5,6]
    let target=1
    const found=binarySearch(v,target)
    expect(found).toBe(true);
});

test('should return true when target found in middle', () => {
    let v=[1,2,3,4,5,6,7]
    let target=7
    const found=binarySearch(v,target)
    expect(found).toBe(true);
});