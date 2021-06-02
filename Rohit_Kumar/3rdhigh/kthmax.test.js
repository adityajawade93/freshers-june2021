const {kthmax} = require('./3rdhigh');

test('3 max in an array', () =>{
    let arr = [7,3,6,9,5,1,8];
    const got = kthmax(arr,3);
    expect(got).toEqual(7);
});

test('3 max in an array', () =>{
    let arr = [1,3];
    const got = kthmax(arr,3);
    expect(got).toEqual(-1);
});

test('3 max in an array', () =>{
    let arr = [2,2,2,2,2,2];
    const got = kthmax(arr,3);
    expect(got).toEqual(2);
});


