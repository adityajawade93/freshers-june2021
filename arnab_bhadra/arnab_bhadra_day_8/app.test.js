
const {app}=require("./index");
const supertest = require('supertest');
const toDoApp=supertest(app.callback());
describe("API: Endpoints test during No data available ",()=>{

    test('Todo App: get all endpoint when No data available', async () => {
        const response = await toDoApp.get("/todo");
        expect(response.text).toEqual("No todo item. Create one");
        expect(response.status).toEqual(200);
    });
    test('Todo App: delete endpoint when No data available', async () => {
        const response = await toDoApp.delete("/todo/1234");
        expect(response.text).toEqual("No item to delete");
        expect(response.status).toEqual(200);
    });
    test('Todo App: get item endpoint when No data available', async () => {
        const response = await toDoApp.get("/todo/1234");
        expect(response.text).toEqual("No todo item. Create one");
        expect(response.status).toEqual(200);
    });
    test('Todo App: Invalid URL',async()=>{
        const response = await toDoApp.get("/invalidurl");
        expect(response.text).toEqual("Page Not Found");
    });
    test('Todo App: Invalid URL 2',async()=>{
        const response = await toDoApp.get("/123456");
        expect(response.text).toEqual("Page Not Found");
    });
    test('Todo App: Base URL',async()=>{
        const response = await toDoApp.get("/");
        expect(response.text).toEqual("Todo app");
    });
});

describe("POST API: Inserting todo item",()=>{
    test('Todo App: Insert a todoItem with invalid input type (Not json)',async ()=>{
        const response = await toDoApp.post("/todo").send("Wrong Input");
        expect(response.text).toEqual("Invalid Input Type");
    })
    test('Todo App: Insert a todoItem with out Title',async ()=>{
        const response = await toDoApp.post("/todo").send({"id":"1234"});
        expect(response.text).toEqual("Title is not present in input");
    })
    test('Todo App: Insert a todoItem with empty Title',async ()=>{
        const response = await toDoApp.post("/todo").send({"Title":""});
        expect(response.text).toEqual("Title is not present in input");
    })
    test('Todo App: Insert a valid todoIteme',async ()=>{
        const response = await toDoApp.post("/todo").send({"Title":"Test1"});
        const output= response.text.startsWith("Todo item created Successfully with id");
        expect(output).toBe(true);
    })
})

describe("GET API: Geting todo items",()=>{
    let id;
    beforeAll(async()=>{
        const response = await toDoApp.post("/todo").send({"Title":"Test2"});
        id=response.text.split(" : ")[1];
        //console.log(id);
    })
    test('Todo App: Get list of todoItems',async ()=>{
        const response = await toDoApp.get("/todo");
        //console.log(response.body)
        expect(response.body.length>0).toBe(true);        
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
    })
    test('Todo App: Get todo item by id',async ()=>{
        const response = await toDoApp.get("/todo/"+id);
        //console.log(response.body)     
        expect(response.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(response.body.Title).toEqual("Test2")
    })
    test('Todo App: Get message for invalid id',async ()=>{
        const response = await toDoApp.get("/todo/abcd1234");
        expect(response.text).toEqual("No Todo item exits for givern id")
    })
} );


describe("UPDATE API: updating existing item",()=>{
    let id;
    beforeAll(async()=>{
        const response = await toDoApp.post("/todo").send({"Title":"Test2"});
        id=response.text.split(" : ")[1];
        //console.log(id);
    });
    test("Todo App: Update an todo item",async ()=>{
        const data={"Title":"Updated Title","date":"05/22/2021","completed":true};
        const response = await toDoApp.put("/todo/"+id).send(data);
        const outputMessage="Title updated\nDate updated\nCompete status updated\nUpdate Complete";
        expect(response.text).toEqual(outputMessage);
    });
    test("Todo App: Update an todo item but date not in valid format",async ()=>{
        const data={"Title":"Updated Title without date","date":"15/22/2021","completed":true};
        const response = await toDoApp.put("/todo/"+id).send(data);
        const outputMessage="Title updated\nInvalid Date format sould be (mm/dd/yyyy)\nCompete status updated\nUpdate Complete";
        expect(response.text).toEqual(outputMessage);
    });
    test("Todo App: Update an todo item but future Date",async ()=>{
        const data={"Title":"Updated Title without date","date":"15/22/2021","completed":true};
        const response = await toDoApp.put("/todo/"+id).send(data);
        const outputMessage="Title updated\nInvalid Date format sould be (mm/dd/yyyy)\nCompete status updated\nUpdate Complete";
        expect(response.text).toEqual(outputMessage);
    });
    test("Todo App: Update an todo item without any valid filed",async ()=>{
        const data={"Title1":"Updated Title Invalid","date1":"15/22/2021"};
        const response = await toDoApp.put("/todo/"+id).send(data);
        
        expect(response.text).toEqual("Item Found But No Field Updated");
    });
    test("Todo App: Update an todo item with invalid id",async ()=>{
        const data={"Title1":"Updated Title Invalid","date1":"15/22/2021"};
        const response = await toDoApp.put("/todo/1234").send(data);
        
        expect(response.text).toEqual("No Todo item exits for givern id");
    });
    
    test("Todo App: Update an todo item with invalid id",async ()=>{
        const data="Invalid Input";
        const response = await toDoApp.put("/todo/1234").send(data);
        
        expect(response.text).toEqual("Invalid Input Type");
    });
});

describe("DELETE API: test Delete iyem",()=>{
    let id;
    beforeAll(async()=>{
        const response = await toDoApp.post("/todo").send({"Title":"Test2"});
        id=response.text.split(" : ")[1];
        //console.log(id);
    });
    test("Todo App: Delete an item",async ()=>{
        const response = await toDoApp.delete("/todo/"+id);
        expect(response.text).toEqual("Deleted todo item Successfully");
    });
    
    test("Todo App: Delete an item",async ()=>{
        const response = await toDoApp.delete("/todo/1234dvb");
        expect(response.text).toEqual("No Todo item exits for givern id");
    });
});