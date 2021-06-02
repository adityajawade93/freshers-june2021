const { duplicates } = require('./duplicates')

test('should return array of duplicates' , ()=> {
    let arr =[1,2,3,4,5,7,7]
    expect(duplicates(arr)).toBe("7")
})

test('should return false if there are no duplicates' , ()=> {
    let arr =[1,2,3,4,5,7]
    expect(duplicates(arr)).toBe(false)
})

test('should return false if it is not array' , ()=> {
    let arr =10
    expect(duplicates(arr)).toBe(false)
})

test('should return false if it is undefined' , ()=> {
    let arr = undefined
    expect(duplicates(arr)).toBe(false)
})

test('should return false if length of the array is 0' , ()=> {
    let arr = []
    expect(duplicates(arr)).toBe(false)
})

