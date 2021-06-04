
const findDublicate = require("./dublicate");
test('find Dublicate: Return a array of dublicate numbers',()=>{
    let arrayOfNumbers=[2,5,4,33,4,5,5];
    const dublicateList= findDublicate.findDublicateInArray(arrayOfNumbers);
    expect(dublicateList).toStrictEqual([4,5]);
});

test('find Dublicate: Return error message if array not provided',()=>{
    let arrayOfNumbers=[2,5,4,33,4,5,5];
    const dublicateList= findDublicate.findDublicateInArray();
    expect(dublicateList).toBe("Input Error");
});

test('find Dublicate: Return error message if number is provided',()=>{
    let arrayOfNumbers=6;
    const dublicateList= findDublicate.findDublicateInArray(6);
    expect(dublicateList).toBe("Input Error");
});

test('find Dublicate: Return empty  list if no Dublicate',()=>{
    let arrayOfNumbers=[1,2,3,4,5,6,7,8];
    const dublicateList= findDublicate.findDublicateInArray(arrayOfNumbers);
    expect(dublicateList).toStrictEqual([]);
});