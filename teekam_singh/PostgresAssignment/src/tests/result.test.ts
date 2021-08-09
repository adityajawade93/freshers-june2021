import app from "../app/app";
import request from 'supertest';


describe('Result Api', () => {
    const data1 ={
        "studentId":"1gntjsd40kqutkqrt",
        "classId":"1gntjs5lgkracrdl6",
        "subjectId":"1gntjsamwkqvywg1o",
        "marks": 90
    }

    test('adding result ', async () => {
        const response = await request(app.callback()).post('/result').send(data1);
        expect(response.status).toBe(200);
    })

    const data2 ={
        "studentId":"1gntjsd40kqutkqrt",
        "classId":"1gntjs5lgkracrdl6",
        "subjectId":"1gntjsamwkqvywg1o"
    }

    test('should get error while adding result if proper data is not given', async () => {
        const response = await request(app.callback()).post('/result').send(data2);
        expect(response.status).toBe(422);
    })

    const data3 ={
        "studentId":"1gntjsd40kqutkqrt",
        "classId":"1gntjs5lgkracrdl6",
        "subjectId":"1gntjsamwkqvywg1o",
        "marks": 95
    }

    test('updating result ', async () => {
        const response = await request(app.callback()).put('/result').send(data3);
        expect(response.status).toBe(200);
    })

    test('getting marks by giving student id ', async () => {
        const response = await request(app.callback()).get('/marks/1gntjsd40kqutkqrt');
        expect(response.status).toBe(200);
    })

    test('when no result exists with given student id ', async () => {
        const response = await request(app.callback()).get('/marks/jsd40kqutkqrt');
        expect(response.text).toBe("Result Not found with this student id.");
    })

    test('should get result of topper by giving class id and subject id ', async () => {
        const response = await request(app.callback()).get('/topper/class/9/subject/m9');
        expect(response.body.length).toBe(1);
    })

    test('should get error message when no result is found by given class id and subject id ', async () => {
        const response = await request(app.callback()).get('/topper/class/10/subject/m9');
        expect(response.text).toBe('No Result found with this class and subject id.');
    })

    test('should get top 3 students from each class ', async () => {
        const response = await request(app.callback()).get('/top/students/3');
        expect(response.status).toBe(200);
    })

})