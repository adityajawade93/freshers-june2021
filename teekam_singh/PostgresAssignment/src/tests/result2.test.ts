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

describe('Result2 Api', () => {
    const data1 ={
        "studentId":"1gntjsd40kqutkqrt",
        "classId":"1gntjs5lgkracrdl6",
        "subjectId":"1gntjsamwkqvywg1o",
        "marks": 90
    }

    test('adding result ', async () => {
        const response = await request(app.callback()).post('/result').send(data1);
        expect(response.status).toBe(500);
    })


    test('error in getting marks by giving student id ', async () => {
        const response = await request(app.callback()).get('/marks/1gntjsd40kqutkqrt');
        expect(response.status).toBe(500);
    })

    test('error in getting result of topper by giving class id and subject id ', async () => {
        const response = await request(app.callback()).get('/topper/class/1gntjs5lgkracrdl6/subject/1gntjsamwkqvywg1o');
        expect(response.status).toBe(500);
    })

    test('error in getting top 3 students from each class ', async () => {
        const response = await request(app.callback()).get('/top/students/3');
        expect(response.status).toBe(500);
    })

    // const data2 ={
    //     "studentId":"1gntjsd40kqutkqrt",
    //     "classId":"1gntjs5lgkracrdl6",
    //     "subjectId":"1gntjsamwkqvywg1o",
    //     "marks": 95
    // }

    // test('updating result ', async () => {
    //     const response = await request(app.callback()).put('/result').send(data2);
    //     expect(response.status).toBe(500);
    // })

})