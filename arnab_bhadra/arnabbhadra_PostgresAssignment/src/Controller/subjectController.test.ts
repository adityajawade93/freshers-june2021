import { app } from "./../Application/app";
import supertest from 'supertest';
const educationApp = supertest(app.callback());

import * as message from "../Middleware/message";
describe('Test cases for API of Subject operations ', () => {
    test('Test case to fetch subjects information with valid page and size', async () => {
        const page = 0;
        const size = 5
        const response = await educationApp.get("/subject?page=" + page + "&size=" + size);
        expect(response.status).toEqual(200);
        expect(response.body.length > 0 && response.body.length <= size).toBe(true);
    });
    test('Test case to fetch subjects information with invalid page and size ',async()=>{
        const page = "abc";
        const size = 5
        const response = await educationApp.get("/subject?page=" + page + "&size=" + size);
        expect(response.status).toEqual(406);
        
    });
});

describe('Test cases API to insert subject information',()=>{
    test("Test case to insert subject information", async ()=>{
        const newSubject ={
            name : "Alogirthm",
            tid : "72e00f39-faef-42d9-91cb-86ebf0c8fef0",
            atid : "abgedbdw-askjwqnd-sss"
        };
        const response = await educationApp.post('/subject').send(newSubject);
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("Data inserted successfully");
    });

    test("Test case 1 to insert subject information with invalid input", async ()=>{
        const newSubject ={
            name : 1234,
            tid : "72e00f39-faef-42d9-91cb-86ebf0c8fef0",
            atid : "abgedbdw-askjwqnd-sss"
        };
        const response = await educationApp.post('/subject').send(newSubject);
        expect(response.status).toEqual(406);
        expect(response.text).toEqual(message.invalidInputMessage);
    });

    test("Test case 2 to insert subject information with invalid input", async ()=>{
        const newSubject ={

        };
        const response = await educationApp.post('/subject').send(newSubject);
        expect(response.status).toEqual(406);
        expect(response.text).toEqual(message.invalidInputMessage);
    });
});