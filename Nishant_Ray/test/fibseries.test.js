const fibseries=require('./fibseries')

test("testcase1",()=>{
     expect(fibseries(5)).toEqual([ 0, 1, 1, 2, 3 ])
})

test("testcase2",()=>{
    expect(fibseries(13)).toEqual([ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144 ])
})

test("testcase3",()=>{
    expect(fibseries(1)).toEqual([ 0 ])
})

test("testcase4",()=>{
    expect(fibseries(2)).toEqual([ 0, 1 ])
})