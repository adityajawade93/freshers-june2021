const printduplicate = require('./duplicates');

test('should get duplicates present in the array', ()=>{
    expect(printduplicate([0,1,1,2,3,4,4,4,5,6])).toEqual([1,4]);
    });

    test('should get duplicates present in the array', ()=>{
        expect(printduplicate([0,1,2,3,5,6])).toEqual([]);
        });

        test('should get duplicates present in the array', ()=>{
            expect(printduplicate([])).toEqual([]);
            });


