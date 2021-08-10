import { app } from '../app';
import request from 'supertest';

const schoolApp = request(app.callback());

describe('Student GET Request', () => {
    test('Valid Params', async () => {
        const page = 0;
        const size = 10;
        const response = await schoolApp.get(`/students?page=${page}&size=${size}`);        
        expect(response.status).toBe(200);
    });
    test('Invalid Params', async () => {
        const page = 0;
        const size = -10;
        const response = await schoolApp.get(`/students?page=${page}&size=${size}`);        
        expect(response.status).toBe(400);
    });
});

describe('Student GET Request By ClassId', () => {
    test('Invalid Class Id', async () => {
        const classId = 0;
        const response = await schoolApp.get(`/students/class/${classId}`);        
        expect(response.status).toBe(400);
        expect(response.text).toEqual('invalid id passed');
    });
    test('Valid Present Class Id', async () => {
        const classId = 'ba846eac-ee6e-4d74-b13d-478dfccea248';
        const response = await schoolApp.get(`/students/class/${classId}`);        
        expect(response.status).toBe(200);
    });
    test('Valid Absent Class Id', async () => {
        const classId = 'ba846eac-ee6e-4d74-b13d-478dfccea247';
        const response = await schoolApp.get(`/students/class/${classId}`);
        expect(response.status).toBe(400);
        expect(response.text).toEqual('Required Id is not Present');
    });
});

describe('Student GET Request By TeacherId', () => {
    test('Invalid TeacherId', async () => {
        const teacherId = 0;
        const response = await schoolApp.get(`/students/teacher/${teacherId}`);        
        expect(response.status).toBe(400);
        expect(response.text).toEqual('invalid id passed');
    });
    test('Valid Present TeacherId', async () => {
        const teacherId = '1c96a972-89eb-4ef4-9ae2-d7cf4230a23f';
        const response = await schoolApp.get(`/students/teacher/${teacherId}`);        
        expect(response.status).toBe(200);
    });
    test('Valid Absent TeacherId', async () => {
        const teacherId = 'ba846eac-ee6e-4d74-b13d-478dfccea247';
        const response = await schoolApp.get(`/students/teacher/${teacherId}`);
        expect(response.status).toBe(400);
        expect(response.text).toEqual('Required Id is not Present');
    });
});

describe('Student GET Request By SubjectId', () => {
    test('Invalid SubjectId', async () => {
        const subjectId = 0;
        const response = await schoolApp.get(`/students/subject/${subjectId}`);        
        expect(response.status).toBe(400);
        expect(response.text).toEqual('invalid id passed');
    });
    test('Valid Present SubjectId', async () => {
        const subjectId = '5a157ed2-8e26-47fa-9bb6-566d49543fd3';
        const response = await schoolApp.get(`/students/subject/${subjectId}`);        
        expect(response.status).toBe(200);
    });
    test('Valid Absent SubjectId', async () => {
        const subjectId = 'ba846eac-ee6e-4d74-b13d-478dfccea247';
        const response = await schoolApp.get(`/students/subject/${subjectId}`);
        expect(response.status).toBe(400);
        expect(response.text).toEqual('Required Id is not Present');
    });
});

describe('Student GET Request for Top Rankings', () => {
    test('Valid number', async () => {
        const top = 10;
        const response = await schoolApp.get(`/students/top/${top}`);        
        expect(response.status).toBe(200);
    });
    test('Invalid number', async () => {
        const top = 0;
        const response = await schoolApp.get(`/students/top/${top}`);        
        expect(response.status).toBe(400);
        expect(response.text).toEqual('Required Data is not Present');
    });
    test('Invalid string number', async () => {
        const top = 'ba846eac-ee6e-4d74-b13d-478dfccea247';
        const response = await schoolApp.get(`/students/top/${top}`);
        expect(response.status).toBe(404);
        expect(response.text).toEqual('invalid input syntax for type bigint: "NaN"');
    });
    test('Invalid negative number', async () => {
        const top = -5;
        const response = await schoolApp.get(`/students/top/${top}`);
        expect(response.status).toBe(404);
        expect(response.text).toEqual('LIMIT must not be negative');
    });
});

describe('Student PUT Request', () => {
    test('Valid Request', async () => {
        const student = {
            name: 'Test',
            classid: '15b3154f-e21a-418f-b0fc-46fb27339302'
        };
        const response = await schoolApp.post(`/student`).send(student);        
        expect(response.status).toBe(201);
        expect(response.text).toEqual('Student added successfully');
    });
    test('Invalid classId', async () => {
        const student = {
            name: 'Test',
            classid: '15b3154f-e21a-418f-b0fc-46f'
        };
        const response = await schoolApp.post(`/student`).send(student);        
        expect(response.status).toBe(406);
        expect(response.text).toEqual('"classid" must be a valid GUID');
    });
    test('Empty Data', async () => {
        const student = {
        };
        const response = await schoolApp.post(`/student`).send(student);        
        expect(response.status).toBe(406);
        expect(response.text).toEqual('"name" is required');
    });
    test('Empty Name', async () => {
        const student = {
            name: '',
            classid: '15b3154f-e21a-418f-b0fc-46fb27339302'
        };
        const response = await schoolApp.post(`/student`).send(student);        
        expect(response.status).toBe(406);
        expect(response.text).toEqual('"name" is not allowed to be empty');
    });
    test('Empty ClassId', async () => {
        const student = {
            name: 'Test',
            classid: ''
        };
        const response = await schoolApp.post(`/student`).send(student);        
        expect(response.status).toBe(406);
        expect(response.text).toEqual('"classid" is not allowed to be empty');
    });
    test('Only Name', async () => {
        const student = {
            name: 'Test'
        };
        const response = await schoolApp.post(`/student`).send(student);        
        expect(response.status).toBe(406);
        expect(response.text).toEqual('"classid" is required');
    });
    test('Only ClassId', async () => {
        const student = {
            classid: 'dghgfh'
        };
        const response = await schoolApp.post(`/student`).send(student);        
        expect(response.status).toBe(406);
        expect(response.text).toEqual('"name" is required');
    });
    test('Student ith non existing ClassId', async () => {
        const student = {
            name: 'Test',
            classid: '15b3154f-e21a-418f-b0fc-46fb27339303'
        };
        const response = await schoolApp.post(`/student`).send(student);        
        expect(response.status).toBe(404);
        expect(response.text).toEqual('Given class does not exists');
    });
});