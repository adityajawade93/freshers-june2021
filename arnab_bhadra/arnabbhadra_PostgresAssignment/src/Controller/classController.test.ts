import { app } from "./../Application/app";
import supertest from 'supertest';
const educationApp = supertest(app.callback());

import * as message from "../Middleware/message";

describe("Test cases API to insert Class Schedule information",()=>{
    test('test cases to insert class schedule information', async ()=>{
        const classSchedule = {
            ssid : "74ed1701-f046-442f-838e-8768f7020910",
            start : "11",
            end : "14"
        };
        const response = await educationApp.post("/classschedule").send(classSchedule);
        expect(response.status).toEqual(200);
        expect(response.text).toEqual("Data inserted successfully");
    });

    test('test cases to insert class schedule information with invalid data', async ()=>{
        const classSchedule = {
            ssid : "74ed1701-f046-442f-838e-8768f7020910",
        };
        const response = await educationApp.post("/classschedule").send(classSchedule);
        expect(response.status).toEqual(406);
        expect(response.text).toEqual(message.invalidInputMessage);
    });
});

