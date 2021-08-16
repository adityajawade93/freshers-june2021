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


describe('schedule Api', () => {
    test('creating a schedule ', async () => {
        const response = await request(app.callback()).post('/schedule').send({"classId": '1gntjs5lgkracrdl6', "subjectId": '1gntjsamwkqvywg1o', "teacherId": '1gntjs84kks4ak2lj'});
        expect(response.status).toBe(200);
    })

    test('should get error message when appropriate data is not given ', async () => {
        const response = await request(app.callback()).post('/schedule').send({"classId": '1gntjs5lgkracrdl6', "subjectId": '1gntjsamwkqvywg1o'});
        expect(response.text).toBe('"teacherId" is required');
    })

    test('should get error message when appropriate data is not given ', async () => {
        const response = await request(app.callback()).post('/schedule').send({"classId": '1gntjs5lgkracrdl6', "subjectId": '1gntjsamwkqvywg1o', "teacherId": 123});
        expect(response.text).toBe('"teacherId" must be a string');
    })
})