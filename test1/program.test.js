const program = require('./program');

test('should return true when element is present in array', () => {
    let a = [1,2,3,4,5];
    let x= 4;
    const found = program.binarysearch(a,x,0,a.length);
    expect(found).toEqual(true);
});

test('should return the nth fibonacci number', () => {
    let n=4;
    const ans= program.fib(n);
    expect(ans).toBe(2);
});

test('should return duplicate numbers', () => {
    let arr = [1,1,2,3,4,4,5,6];
    let v= program.duplicate(arr);
    expect(v).toEqual([1,4]);
});

test('should return 3rd highest', () => {
    let arr = [1,1,2,3,4,4,5,6];
    let p= program.thirdhigh(arr);
    expect(p).toBe(4);
});

