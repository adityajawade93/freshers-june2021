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


describe('schedule2 Api', () => {
    test('error while creating a schedule ', async () => {
        const response = await request(app.callback()).post('/schedule').send({"classId": '1gntjs5lgkracrdl6', "subjectId": '1gntjsamwkqvywg1o', "teacherId": '1gntjs84kks4ak2lj'});
        expect(response.status).toBe(500);
    })
})