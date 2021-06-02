const { highest } = require('./highest3')

test('should return the 3rd highest number' , () =>{
    let arr = [3,7,6,5,9,4]
    expect(highest(arr)).toBe(6)
}) 

test('should return false if arraylength is less than 3' , () =>{
    let arr = [3,7]
    expect(highest(arr)).toBe(false)
}) 

test('should return false if it is not an array' , () =>{
    let arr = 5
    expect(highest(arr)).toBe(false)
}) 

test('should return false if any element in the array is not integer' , () =>{
    let arr = [3,7,6,"strings",9,4]
    expect(highest(arr)).toBe(false)
}) 

