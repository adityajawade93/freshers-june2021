const { fibo } = require('./fib');


test('should return series for positive x', () => { // spec
    let x = 5; // arrange
    var f = fibo(x); // act
    expect(f).toBe(3);
});

test('should return series for positive x', () => { // spec
    let x = 0; // arrange
    var f = fibo(x); // act
    expect(f).toBe("false");
});

test('should return series for positive x', () => { // spec
    let x = -5; // arrange
    var f = fibo(x); // act
    expect(f).toBe("false");
});