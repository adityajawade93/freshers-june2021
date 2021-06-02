const algo = require('./algo');

test('should return duplicates number',()=>{

    let arr = [1,1,2,3,4,4,5,6];
    let v = algo.findDuplicates(arr);
    expect(v.sort()).toEqual([1,4].sort());

});


test('should return index in array',()=>{

    let arr = [1,1,2,3,5,8,9,10];
    let index = algo.binarySearch(arr,0,arr.length-1,5);
    expect(index).toBe(4);
    

});

test('should return 3rd largest elemnt',()=>{

    let arr = [1,2,5,8,10,12];
    let num = algo.find3rdLargest(arr);
    expect(num).toBe(8);
    

});

test('should return fib nuber',()=>{

    
    let fib = algo.fib(8);
    expect(fib).toBe(21);
    

});

