export{};
//const app = require('../index.ts');
const makeapp = require('../index.ts');
const Router = require('../routes/main.ts');
const app = makeapp(Router);
const { test, expect, describe } = require('@jest/globals');
const request = require('supertest');

describe('Test for subjectmarksByStudent', () => {
  test('test of valid inputs', async () => {
    const studentId = 1;
    const res = await request(app.callback()).get(`/result/subjectmarksByStudent/${studentId}`);
    expect(res.status).toBe(200);
  });

  test('test of invalid inputs', async () => {
    const studentId = "hii";
    const res = await request(app.callback()).get(`/result/subjectmarksByStudent/${studentId}`);

    expect(res.text).toBe('Invalid parameters passed');
    expect(res.status).toBe(400);
  });

  test('test of non-existent valid inputs', async () => {
    const studentId = 102;
    const res = await request(app.callback()).get(`/result/subjectmarksByStudent/${studentId}`);

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Could not get subject marks by student. No student exists with given student ID.');
  });
});

describe('Test for topstudentWithSubject', () => {
  test('test of valid inputs', async () => {
    const classId = 1;
    const res = await request(app.callback()).get(`/result/topstudentWithSubject/${classId}`);

    expect(res.status).toBe(200);
  });

  test('test of invalid inputs', async () => {
    const classId = "hii";
    const res = await request(app.callback()).get(`/result/topstudentWithSubject/${classId}`);
    expect(res.text).toBe('Invalid parameters passed');
    expect(res.status).toBe(400);
  });

  test('test of non-existent valid inputs', async () => {
    const classId = 101;
    const res = await request(app.callback()).get(`/result/topstudentWithSubject/${classId}`);
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Could not get top student with subjectid: Given class ID does not exist.');
  });
});

describe('Test for topscoreStudents', () => {
  test('testing normal functioning of this method', async () => {
    const res = await request(app.callback()).get(`/result/topscoreStudents`);

    expect(res.status).toBe(200);
  });
});
