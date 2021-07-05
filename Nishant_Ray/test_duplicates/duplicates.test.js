const { expect } = require("@jest/globals");
const duplicates=require("./duplicates")

test("testcase1",()=>{
    var arr=[1,2,3,4,4,5,6,7,7];
    expect(duplicates(arr)).toEqual([4,7])
})

test("testcase1",()=>{
    var arr=[1,2,3,4,4,4,4,4,5,6,6,6,7,7];
    expect(duplicates(arr)).toEqual([4,6,7])
})

test("testcase1",()=>{
    var arr=[4,4,4,4,4,4,4];
    expect(duplicates(arr)).toEqual([4])
})

test("testcase1",()=>{
    var arr=[1,2,3,4,5,6,7];
    expect(duplicates(arr)).toEqual([])
})