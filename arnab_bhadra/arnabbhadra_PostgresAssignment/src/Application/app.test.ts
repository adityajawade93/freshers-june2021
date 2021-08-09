import { app } from "./app";
import supertest from 'supertest';
import * as message from "../Middleware/message";

const educationApp = supertest(app.callback());

describe("Test invalid URL",()=>{
    test("test API for invalid url",async ()=>{
        const response = await educationApp.get("/invalid");
        expect(response.status).toEqual(404);
        expect(response.text).toEqual(message.pageNotFoundMessage);
    });
});