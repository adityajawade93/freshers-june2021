const { expect } = require("@jest/globals");
const {fibonacciSeriesList} = require("./fibonacci");
test('fibonacci: should return a series for a positive integer index',()=>{
    const fSeries=fibonacciSeriesList(4);
    expect(fSeries).toStrictEqual([0,1,1,2]);
});
test('fibonacci: should return a series for a positive integer index',()=>{
    const fSeries=fibonacciSeriesList(0);
    expect(fSeries).toStrictEqual([0]);
});

test('fibonacci: should return a series for a positive integer index',()=>{
    const fSeries=fibonacciSeriesList(1);
    expect(fSeries).toStrictEqual([0,1]);
});

test('fibonacci: should return error message for a negetive integer index',()=>{
    const fSeries=fibonacciSeriesList(-1);
    expect(fSeries).toStrictEqual("Input Error");
});

test('fibonacci: should return error message for a not integer index',()=>{
    const fSeries=fibonacciSeriesList(1.213);
    expect(fSeries).toStrictEqual("Input Error");
});

test('fibonacci: should return error message for a not integer index',()=>{
    const fSeries=fibonacciSeriesList("ANC");
    expect(fSeries).toStrictEqual("Input Error");
});