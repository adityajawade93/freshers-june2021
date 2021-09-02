export{};
//const app = require('../index.ts');
const makeapp = require('../index.ts');
const Router = require('../routes/main.ts');
const app = makeapp(Router);
const { test, expect, describe } = require('@jest/globals');
const request = require('supertest');

describe('Test for studentsbyClass', () => {
  test('test of invalid inputs', async () => {
    const classId = "hii";
    const res = await request(app.callback()).get(`/schedule/studentsbyClass/${classId}`);

    expect(res.text).toBe('Invalid parameters passed');
    expect(res.status).toBe(400);
  });

  test('test of valid inputs', async () => {
    const classId = 1;
    const res = await request(app.callback()).get(`/schedule/studentsbyClass/${classId}`);

    expect(res.status).toBe(200);
  });

  test('test of non-existent valid inputs', async () => {
    const classId = 101;
    const res = await request(app.callback()).get(`/schedule/studentsbyClass/${classId}`);

    expect(res.status).toBe(500);
  });
});

describe('Test for addschedule', () => {
  test('test of valid inputs', async () => {
    const schedule  = {
      class_id: 3,
      subject_id: 4,
	    teacher_id: 5
    }
    const res = await request(app.callback()).post(`/schedule/addschedule`).send(schedule);

    expect(res.body.message).toBe('Entry successful into schedule table');
    expect(res.status).toBe(200);
  });

  test('test of invalid inputs', async () => {
    const schedule  = {
      class_id: "hii",
      subject_id: 4,
	    teacher_id: 5
    }
    const res = await request(app.callback()).post(`/schedule/addschedule`).send(schedule);

    expect(res.text).toBe('Invalid parameters passed');
    expect(res.status).toBe(400);
  });

  test('test of repetitive valid inputs', async () => {
    const schedule  = {
      class_id: 3,
      subject_id: 4,
	    teacher_id: 5
    }
    const res = await request(app.callback()).post(`/schedule/addschedule`).send(schedule);

    expect(res.status).toBe(500);
    //expect(res.body.error).toBe('Could not add entry to schedule table: cannot insert duplicate entry');
  });
});

describe('Test for studentsByTeacher', () => {
  test('test of valid inputs', async () => {
    const teacherId = 1;
    const res = await request(app.callback()).get(`/schedule/studentsByTeacher/${teacherId}`);

    expect(res.status).toBe(200);
  });

  test('test of invalid inputs', async () => {
    const teacherId = "hii";
    const res = await request(app.callback()).get(`/schedule/studentsByTeacher/${teacherId}`);
    expect(res.text).toBe('Invalid parameters passed');
    expect(res.status).toBe(400);
  });

  test('test of non-existent valid id inputs', async () => {
    const teacherId = 100;
    const res = await request(app.callback()).get(`/schedule/studentsByTeacher/${teacherId}`);
    
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Could not get student by teacher: No class exists with given Teacher ID ,hence no Student.');
  });
});

describe('Test for studentsBySubject', () => {
  test('test of valid inputs', async () => {
    const subjectId = 1;
    const res = await request(app.callback()).get(`/schedule/studentsBySubject/${subjectId}`);

    expect(res.status).toBe(200);
  });

  test('test of invalid inputs', async () => {
    const subjectId = "hii";
    const res = await request(app.callback()).get(`/schedule/studentsBySubject/${subjectId}`);

    expect(res.text).toBe('Invalid parameters passed');
    expect(res.status).toBe(400);
  });

  test('test of non-existent id inputs', async () => {
    const subjectId = 100;
    const res = await request(app.callback()).get(`/schedule/studentsBySubject/${subjectId}`);

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Could not get student by subject: No class exists with given subject ID, hence Student also does not exist.');
  });
});
