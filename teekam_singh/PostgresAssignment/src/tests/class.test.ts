import app from "../app/app";
import request from 'supertest';
import { setpath, start, disconnect } from "../db/database";

beforeAll( () => {
    start();
    setpath();
});

afterAll( () => {
    disconnect();
});


describe('Class Api', () => {
    test('creating a class ', async () => {
        const response = await request(app.callback()).post('/class').send({"name": 'polity'});
        expect(response.status).toBe(200);
    })

    test('should get error if class name is not appropriate while creating a class ', async () => {
        const response = await request(app.callback()).post('/class').send({"name": 234});
        expect(response.status).toBe(422);
    })

    test('should get class list ', async () => {
        const response = await request(app.callback()).get('/class');
        expect(response.status).toBe(200);
    })

    test('should get student list by class id ', async () => {
        const response = await request(app.callback()).get('/class/1gntjs5lgkracrdl6/students');
        expect(response.body.length).toBeGreaterThan(0);
    })

    test('should get No student message by class id in which no student is registered ', async () => {
        const response = await request(app.callback()).get('/class/1gnzihjx44hcssy3e/students');
        expect(response.text).toBe('No student exists in this class.');
    })

})