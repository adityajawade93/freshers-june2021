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

describe('teacher Api', () => {
    test('error while adding a teacher ', async () => {
        const response = await request(app.callback()).post('/teacher').send({"name": 'Vinay', "subjectId":'1gntjsamwkqvywg1o'});
        expect(response.status).toBe(500);
    })

    test('error while getting teacher list ', async () => {
        const response = await request(app.callback()).get('/teacher');
        expect(response.status).toBe(500);
    })

    test('error while getting student list with teacher id', async () => {
        const response = await request(app.callback()).get('/teacher/502/students');
        expect(response.status).toBe(500);
    })

})