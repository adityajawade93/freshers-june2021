import app from "../app/app";
import request from 'supertest';
import { setpath, start, disconnect } from "../db/database";

beforeAll( () => {
    disconnect();
});

afterAll( () => {
    start();
    setpath();
});

describe('Class Api', () => {
    test('error when getting class list ', async () => {
        const response = await request(app.callback()).get('/class');
        expect(response.status).toBe(500);
    })

    test('error when creating a class ', async () => {
        const response = await request(app.callback()).post('/class').send({"name": 'polity'});
        expect(response.status).toBe(500);
    })

    test('error when getting student list by class id ', async () => {
        const response = await request(app.callback()).get('/class/1gntjs5lgkracrdl6/students');
        expect(response.status).toBe(500);
    })

    test('error when given class id is not a uuid ', async () => {
        const response = await request(app.callback()).get('/class/1gntjs5lg/students');
        expect(response.status).toBe(422);
    })

})