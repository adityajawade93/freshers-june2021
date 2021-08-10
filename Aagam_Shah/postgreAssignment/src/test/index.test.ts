import { app } from '../app';
import request from 'supertest';

const schoolApp = request(app.callback());

describe('Invalid GET Request', () => {
    test('invalid URL', async () => {   
        const response = await schoolApp.get(`/invalid`);
        expect(response.status).toBe(404);
    });
});