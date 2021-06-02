const { binarysearch } = require("./binarysearch")

test('should return true if element is in the array' , () => {
    let arr = [1,2,3,4,5]
    expect(binarysearch(arr,4,0,5)).toBe(true)
})

test('suould return false if element is not in the array' , () =>{
    let arr = [1,2,3,4,5]
    expect(binarysearch(arr,7,0,5)).toBe(false)
})

test('suould return false if its not a array' , () =>{
    let arr = 1
    expect(binarysearch(arr,7,0,5)).toBe(false)
})

test('suould return false if findvalue is undefined' , () =>{
    let arr = [1,2,3,4,5]
    expect(binarysearch(arr,undefined,0,5)).toBe(false)
})

test('suould return false if findvalue is odd' , () =>{
    let arr = [1,2,3,4,5]
    expect(binarysearch(arr,7,0,5)).toBe(false)
})
