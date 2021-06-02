const { fabonacci } = require('./fabonacci')

test('should return true if fabonacci series is done', () =>{
    expect(fabonacci(parseInt(10))).toBe(true)
}) 

test('should return false if number is negative', () =>{
    expect(fabonacci(-1)).toBe(false)
}) 

test('should return false if number is undefined', () =>{
    expect(fabonacci(undefined)).toBe(false)
}) 

test('should return false if number is not integer', () =>{
    expect(fabonacci(10.5)).toBe(false)
}) 