const printfib =  require('./fibonacci');

test('should get first n numbers of fibseries', ()=>{
let arr=[0,1,1,2]
expect(printfib(4)).toEqual(arr);
});

test('should get first n numbers of fibseries', ()=>{
let arr=[0,1]
expect(printfib(2)).toEqual(arr);
});

test('should get first n numbers of fibseries', ()=>{
let arr=[0,1,1,2,3,5,8,13,21,34,55]
expect(printfib(11)).toEqual(arr);
});