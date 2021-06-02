const { fib } = require('./fib');

test('test case', () => {
    let n = 5;
    for(var i=0;i<=n;i++)
    {
        if(i<=1)
        {
            const result = fib(i);
            expect(result).toBe(i);
        }
        else
        {
            const result = fib(i);
            expect(result).toBe(fib(i-2)+fib(i-1));
        }
    }
});

test('test case', () => {
    let n = 6;
    for(var i=0;i<=n;i++)
    {
        if(i<=1)
        {
            const result = fib(i);
            expect(result).toBe(i);
        }
        else
        {
            const result = fib(i);
            expect(result).toBe(fib(i-2)+fib(i-1));
        }
    }
});