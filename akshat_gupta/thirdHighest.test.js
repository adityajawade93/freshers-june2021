const thirdHighest = require('./thirdhighest')

test('should return correct answer', () => {
    let v=[1,2,3,4,5,6,7]
    const found=thirdHighest(v)
    expect(found).toBe(5)
});

test('should return correct answer if duplicates present', () => {
    let v=[1,2,3,4,5,6,7,7]
    const found=thirdHighest(v)
    expect(found).toBe(6)
});

test('should return correct answer if the one of the duplicates is the answer', () => {
    let v=[1,2,3,4,5,6,6,6,6]
    const found=thirdHighest(v)
    expect(found).toBe(6)
});

test('should return null if size of array <3', () => {
    let v=[1,2]
    const found=thirdHighest(v)
    let v1=[]
    const found2=thirdHighest(v1)
    expect(found).toBe(null)
    expect(found2).toBe(null)
});