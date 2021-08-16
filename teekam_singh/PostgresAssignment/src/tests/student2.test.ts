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

describe('student2 Api', () => {

    test('error while adding a student ', async () => {
        const response = await request(app.callback()).post('/student').send({"name": 'John'});
        expect(response.status).toBe(500);
    })

    test('error while adding a student to class ', async () => {
        const response = await request(app.callback()).post('/student/class').send({"studentId": '1gntjsd40kqutkqrt', "classId": '1gntjs5lgkracrdl6'});
        expect(response.status).toBe(500);
    })

    test('error while getting student list ', async () => {
        const response = await request(app.callback()).get('/student?page=0&size=10');
        expect(response.status).toBe(500);
    })

})