import app from "../app/app";
import request from 'supertest';


describe('subject Api', () => {
    test('creating a subject', async () => {
        const response = await request(app.callback()).post('/subject').send({"name": 'history'});
        expect(response.status).toBe(200);
    })

    test('should get error message in creating subject when name is not given appropriately ', async () => {
        const response = await request(app.callback()).post('/subject').send({"name": 123});
        expect(response.text).toBe('"name" must be a string');
    })

    test('should get subject list ', async () => {
        const response = await request(app.callback()).get('/subject');
        expect(response.body.length).toBeGreaterThan(0);
    })

    test('should get student list with subject id', async () => {
        const response = await request(app.callback()).get('/subject/m10/students');
        expect(response.body.length).toBeGreaterThan(0);
    })

    test('should get error message when no student is present in given class ', async () => {
        const response = await request(app.callback()).get('/subject/m20/students');
        expect(response.text).toBe('No student exists in this subject.');
    })

})