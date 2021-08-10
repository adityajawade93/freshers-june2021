import { app } from '../app';
import request from 'supertest';

const schoolApp = request(app.callback());

describe('Marks GET Request By studentId', () => {
    test('Invalid studentId', async () => {
        const studentId = 0;
        const response = await schoolApp.get(`/marks/student/${studentId}`);        
        expect(response.status).toBe(400);
        expect(response.text).toEqual('invalid id passed');
    });
    test('Valid Present studentId', async () => {
        const studentId = '7843c395-427a-4252-9bca-3fb6c7a15f6c';
        const response = await schoolApp.get(`/marks/student/${studentId}`);        
        expect(response.status).toBe(200);
    });
    test('Valid Absent studentId', async () => {
        const studentId = 'ba846eac-ee6e-4d74-b13d-478dfccea247';
        const response = await schoolApp.get(`/marks/student/${studentId}`);
        expect(response.status).toBe(400);
        expect(response.text).toEqual('Required Id is not Present');
    });
});

describe('Marks GET Request for Highest Marks By subjectId', () => {
    test('Invalid studentId', async () => {
        const subjectId = 0;
        const response = await schoolApp.get(`/marks/highest/subject/${subjectId}`);        
        expect(response.status).toBe(400);
        expect(response.text).toEqual('invalid id passed');
    });
    test('Valid Present subjectId', async () => {
        const subjectId = 'a581e7ba-1a1f-4b74-9973-141b64bc3d1f';
        const response = await schoolApp.get(`/marks/highest/subject/${subjectId}`);        
        expect(response.status).toBe(200);
    });
    test('Valid Absent subjectId', async () => {
        const subjectId = 'ba846eac-ee6e-4d74-b13d-478dfccea247';
        const response = await schoolApp.get(`/marks/highest/subject/${subjectId}`);
        expect(response.status).toBe(400);
        expect(response.text).toEqual('Required Id is not Present');
    });
});