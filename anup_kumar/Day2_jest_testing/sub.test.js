const sub=require('./sub')
test('subtact 3-1 to equal 2', () => {
  expect(sub(3, 1)).toBe(2);
});

test("subtact  5 from 3",()=>
{
    expect(sub(5,3)).toBe(2);
})

var a=5;
