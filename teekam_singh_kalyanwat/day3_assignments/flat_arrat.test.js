const flat_arr = require('./flat_array');

test('should get the flatten array ', ()=>{
    let arr=[0,1,[2,3,[4,[]],5],6,7]
    let ans=[];
    flat_arr(arr,ans);
    expect(ans).toEqual([0,1,2,3,4,5,6,7]);
    });


test('should get the empty flatten array ', ()=>{
    let arr=[[[[[[]]]]]]
    let ans=[];
    flat_arr(arr,ans);
    expect(ans).toEqual([]);
    });


test('should get the flatten array ', ()=>{
    let arr=[[[1,[[[[[[[[[[[[3]]]]]]]]]]]]]]];
    let ans=[];
    flat_arr(arr,ans);
    expect(ans).toEqual([1,3]);
    });

