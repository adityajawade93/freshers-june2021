const third_highest=require("./3rd_highest")

test("testcase1",()=>{
    var arr=[1,2,3,4,5,6,7,8,9];
    expect(third_highest(arr)).toEqual(7)
})

test("testcase1",()=>{
    var arr=[1,2,3,4,5,6,7,8,9,9,9];
    expect(third_highest(arr)).toEqual(9)
})

test("testcase1",()=>{
    var arr=[1,2];
    expect(third_highest(arr)).toEqual(-1)
})

test("testcase1",()=>{
    var arr=[7,7,7,7,7,7];
    expect(third_highest(arr)).toEqual(7)
})
