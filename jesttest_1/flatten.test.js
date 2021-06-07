const { flatten } = require('./flatten')

test( 'should return flattenedarray' , () =>{
    let arr = [
        1,
        [2,3],
        [
            [4,5],
            [6,7]
        ],
        8,
        [9,10],
        "hi",
        ["bye",true],
        {name:"sujit",
         age:"20"}
    ]

    expect(flatten(arr,[])).toStrictEqual([1,2,3,4,5,6,7,8,9,10,'hi','bye',true,{name: 'sujit',age:'20'}])
})


test ('return false if there is no array passed' , () =>{
    let arr = 1;
    expect(flatten(arr,[])).toBe(false)
})