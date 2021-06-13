
const {app,validateDate,validateTodo,}=require("./Todoapp");

test('Validate Date Function: should return proper date in string',()=>{
    const date=validateDate("11/05/2020");
    expect(date).toStrictEqual("11/05/2020");
});

test('Validate Date Function: should return false for invalid input',()=>{
    const date=validateDate("11/05/2");
    expect(date).toStrictEqual(false);
});

test('Validate Date Function: should return false for invalid input',()=>{
    const date=validateDate("11/05/2");
    expect(date).toStrictEqual(false);
});

test('Validate Date Function: should return false for invalid input',()=>{
    const date=validateDate("2019/01/02");
    expect(date).toStrictEqual(false);
});

test('Validate Date Function: should return false for future date',()=>{
    const date=validateDate("10/25/2025");
    expect(date).toStrictEqual(false);
});

test("Validate Todo Item: should return proper todo item",()=>{
    const todoItem= validateTodo({"Title":"Demo"});
    expect(todoItem.Title).toStrictEqual("Demo");
});

test("Validate Todo Item: should return false if Title not present in todo item",()=>{
    const todoItem= validateTodo({"Task":"Demo"});
    expect(todoItem).toStrictEqual(false);
});

test("Validate Todo Item: should return false fro invalid input",()=>{
    const todoItem= validateTodo("Title");
    expect(todoItem).toStrictEqual(false);
});

test("Validate Todo Item: should return for for empty todo item",()=>{
    const todoItem= validateTodo({"Task":""});
    expect(todoItem).toStrictEqual(false);
});

test("Validate Todo Item: should return false fro invalid input",()=>{
    const todoItem= validateTodo(1234);
    expect(todoItem).toStrictEqual(false);
});

