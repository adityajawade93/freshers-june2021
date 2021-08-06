import { app } from "./../Application/app";
import supertest from 'supertest';
const educationApp = supertest(app.callback());

import * as message from "../Middleware/message";

describe("TEST API for teacher operations ", () => {
    test("Test case to fetch the teachers' information with valid page and size", async () => {
        const page = 0;
        const size = 2;
        const response = await educationApp.get("/teacher?page=" + page + "&size=" + size);
        expect(response.body.length > 0 && response.body.length <= size).toEqual(true);
        expect(response.status).toEqual(200);

    });
    test("Test case 2 to fetch the teachers' information with valid page and size", async () => {
        const page = 1;
        const size = 2;
        const response = await educationApp.get("/teacher?page=" + page + "&size=" + size);
        expect(response.body.length > 0 && response.body.length <= size).toEqual(true);
        expect(response.status).toEqual(200);
    });

    test("Test case to fetch the teachers' information with invalid page and size", async () => {
        const page = 10000101001010;
        const size = 2;
        const response = await educationApp.get("/teacher?page=" + page + "&size=" + size);
        expect(response.status).toEqual(406);
    });

});


describe('Test cases API to insert teacher information', () => {
    test("test case to insert teacher information", async () => {
        const newTeacher = {
            name: "Demo Teacher",
            contactno: 81052134,
            specialization: "CS"
        }
        const response = await educationApp.post("/teacher",).send(newTeacher);
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("Data inserted successfully");
    });
    test("test case 2 to insert teacher information", async () => {
        const newTeacher = {
            name: "Demo Teacher 2",
            contactno: 81052134,
            
        }
        const response = await educationApp.post("/teacher",).send(newTeacher);
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("Data inserted successfully");
    });

    test("test case 3 to insert teaher information with invalid data", async ()=>{
        const invalidTeacher = {
            name: 12465667,
            contactno: 81052134,
            
        }
        const response = await educationApp.post("/teacher",).send(invalidTeacher);
        expect(response.status).toEqual(406);
        expect(response.text).toEqual(message.invalidInputMessage);
    });

    test("test case 4  to insert teaher information with invalid data", async ()=>{
        const invalidTeacher = {
            name: "Demo Teacher 3",
        }
        const response = await educationApp.post("/teacher",).send(invalidTeacher);
        expect(response.status).toEqual(406);
        expect(response.text).toEqual(message.invalidInputMessage);
    });
});