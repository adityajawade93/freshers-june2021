const fibonacci = require("./Fibonacci");

test('if n=0', () => {
    expect(fibonacci(0)).toBe(0);
  });
test('if n=1', () => {
    expect(fibonacci(1)).toBe(1);
});
test('if no is non integer', () => {
    expect(fibonacci(1.1)).toBe("not_correct_type");
});
test('if no is negative', () => {
    expect(fibonacci(-1)).toBe("negative");
});
test('if no=5', () => {
    expect(fibonacci(5)).toBe(5);
});
