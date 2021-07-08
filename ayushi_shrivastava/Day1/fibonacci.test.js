const fibonacci = require('./fibonacci');

test('fibonacci function exists', ()=>{
    expect(fibonacci).toBeDefined();
});

test('fibonacci for 7 ', ()=>{
    expect(fibonacci(7)).toBe(13);
});