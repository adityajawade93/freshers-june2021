const binary_search=require("./Binary_search")

test('subtact 3-1 to equal 2', () => {
    let arr=[4,6,2];
    expect(binary_search(arr,0,arr.length-1,2)).toBe("Not Sorted");
});


  
  test("sould be yes ",()=>
  {
      expect(binary_search([1,2],0,1,2)).toBe("yes");
  })
  
  test("sould be no ",()=>
  {
      expect(binary_search([1,2],0,1,3)).toBe("no");
  })

  test("sould be not integer ",()=>
  {
      expect(binary_search(["anup","subham"],0,1,3)).toBe("not interger");
  })
  
  