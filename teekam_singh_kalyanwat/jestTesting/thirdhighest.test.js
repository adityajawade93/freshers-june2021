const third_highest =   require('./thirdhighest');

test('should get 3rd highest element present in the array', ()=>{
expect(third_highest([0,1,3,2,5,6])).toBe(3);
});

test('should get 3rd highest element present in the array', ()=>{
expect(third_highest([0,1])).toBe('Not enough elements');
});

test('should get 3rd highest element present in the array', ()=>{
expect(third_highest([10,30,30,30])).toBe(30);
});
