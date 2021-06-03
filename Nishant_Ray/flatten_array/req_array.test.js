const req_array=require("./req_array")

test("testcase1",()=>{
    let arr=[[[[[[1]]]]]];
    expect(req_array(arr)).toEqual([1])
})

test("testcase2",()=>{
    let arr=[[[[[[1],2,3],4]]]];
    expect(req_array(arr)).toEqual([1,2,3,4])
})

test("testcase3",()=>{
    let arr=[1,2,3,4,5,6,7,8];
    expect(req_array(arr)).toEqual([1,2,3,4,5,6,7,8])
})

test("testcase4",()=>{
    let arr=[1,[2,[3,[4,[5,[6,[7,[8,[9,[0]]]]]]]]]];
    expect(req_array(arr)).toEqual([1,2,3,4,5,6,7,8,9,0])
})








