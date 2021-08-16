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

describe('student Api', () => {

    test('adding a student ', async () => {
        const response = await request(app.callback()).post('/student').send({"name": 'John'});
        expect(response.status).toBe(200);
    })

    test('should get error message in creating student when student name is not given appropriately ', async () => {
        const response = await request(app.callback()).post('/student').send({"name": 123});
        expect(response.text).toBe('"name" must be a string');
    })

    test('adding a student to class ', async () => {
        const response = await request(app.callback()).post('/student/class').send({"studentId": '1gntjsd40kqutkqrt', "classId": '1gntjs5lgkracrdl6'});
        expect(response.status).toBe(200);
    })

    test('should get error message in adding student to class when all the parameters are not given ', async () => {
        const response = await request(app.callback()).post('/student/class').send({"studentId": '110'});
        expect(response.text).toBe('"classId" is required');
    })

    test('getting student list ', async () => {
        const response = await request(app.callback()).get('/student?page=0&size=10');
        expect(response.body).toEqual(expect.arrayContaining([{ student_id: '103', student_name: 'anurag' }]));
    })

    test('error in getting student list ', async () => {
        const response = await request(app.callback()).get('/student?page=0&size=0');
        expect(response.status).toBe(422);
    })

    test('should get error message while getting student list  to class when page or size is not given ', async () => {
        const response = await request(app.callback()).post('/student?page=0');
        expect(response.status).toBe(422);
    })

})