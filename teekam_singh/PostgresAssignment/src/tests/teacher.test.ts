import app from "../app/app";
import request from 'supertest';


describe('teacher Api', () => {
    test('adding a teacher ', async () => {
        const response = await request(app.callback()).post('/teacher').send({"name": 'Vinay', "subjectId":'1gntjsamwkqvywg1o'});
        expect(response.status).toBe(200);
    })

    test('should get error message in creating teacher when details are not given appropriately ', async () => {
        const response = await request(app.callback()).post('/teacher').send({"name": 123, "subjectId":'1gntjsamwkqvywg1o'});
        expect(response.text).toBe('"name" must be a string');
    })

    test('should get teacher list ', async () => {
        const response = await request(app.callback()).get('/teacher');
        expect(response.body.length).toBeGreaterThan(0);
    })

    test('should get student list with teacher id', async () => {
        const response = await request(app.callback()).get('/teacher/502/students');
        expect(response.body.length).toBeGreaterThan(0);
    })

    test('should get error message when no student is present with given teacher id ', async () => {
        const response = await request(app.callback()).get('/teacher/232ubdi/students');
        expect(response.text).toBe('No student exists with this teacher id.');
    })

})