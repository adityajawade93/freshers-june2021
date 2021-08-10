import { app } from '../app';
import request from 'supertest';

const schoolApp = request(app.callback());

describe('Subject GET Request', () => {
    test('Valid Params', async () => {
        const page = 0;
        const size = 10;
        const response = await schoolApp.get(`/subjects?page=${page}&size=${size}`);        
        expect(response.status).toBe(200);
    });
    test('Invalid Params', async () => {
        const page = 0;
        const size = -10;
        const response = await schoolApp.get(`/subjects?page=${page}&size=${size}`);        
        expect(response.status).toBe(400);
    });
});