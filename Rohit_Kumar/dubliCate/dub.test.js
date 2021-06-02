const {dubliCate} = require('./dub');

test('Dublicate numbers', () =>{
    let arr = [1,2,3,4,4,5,6,7,7]
    const got = dubliCate(arr)
    expect(got).toEqual([4,7]);
});

test('dublicate numbers', () =>{
    let arr = [1,2,3,3,4,5,5,8,9]
    const got = dubliCate(arr);
    expect(got).toEqual([3,5]);
});

test('dublicate numbers', () =>{
    let arr = [7,7,7,7,7,7,7,7,7]
    const got = dubliCate(arr);
    expect(got).toEqual([7]);
});

test('dublicate numbers', () =>{
    let arr = [5,6,8,9,12]
    const got = dubliCate(arr);
    expect(got).toEqual([]);
});