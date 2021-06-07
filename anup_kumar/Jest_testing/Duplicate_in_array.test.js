const find_duplicate=require("./Duplicate_in_array")

test('Not duplicated', () => {
    let arr=[4,6,2];
    expect(find_duplicate(arr)).toBe("no duplicate")
});

