
const flatten =require("./flatten");
test('flatten: Should return flatten of an array',()=>{
    let arr= [
      1,
      2,
      [3, 4],
      [
        [5, 6],
        7
      ],
      8,
      9
    ]
    const  flattenArray=flatten.flattenofArray(arr);
    expect(flattenArray).toStrictEqual([1,2,3,4,5,6,7,8,9])
});

test('flatten: Should return flatten of an array',()=>{
    const arr= [[1],[]];
    const  flattenArray1=flatten.flattenofArray(arr);
    expect(flattenArray1).toStrictEqual([1])
});

test('flatten: Should return error message if input is not an array',()=>{
    const arr= 1;
    const  flattenArray1=flatten.flattenofArray(arr);
    expect(flattenArray1).toStrictEqual("Input Error")
});