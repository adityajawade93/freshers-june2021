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


describe('subject Api', () => {
    test('error while creating a subject', async () => {
        const response = await request(app.callback()).post('/subject').send({"name": 'history'});
        expect(response.status).toBe(500);
    })

    test('error while getting subject list ', async () => {
        const response = await request(app.callback()).get('/subject');
        expect(response.status).toBe(500);
    })

    test('error while getting student list with subject id', async () => {
        const response = await request(app.callback()).get('/subject/1gntjsamwkqvywg1o/students');
        expect(response.status).toBe(500);
    })

})