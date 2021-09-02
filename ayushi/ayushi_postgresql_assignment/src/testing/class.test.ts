export{};
//const app = require('../index.ts');
const makeapp = require('../index.ts');
const Router = require('../routes/main.ts');
const app = makeapp(Router);
const { test, expect, describe } = require('@jest/globals');
const request = require('supertest');

describe('Test for getclassList', () => {
  test('test of normal working of this function', async () => {
    const res = await request(app.callback()).get(`/class/getclassList`);
    expect(res.status).toBe(200);
  });
});

describe('Test for addstudentToClassList', () => {
  test('test of valid inputs', async () => {
    const student_class = {
      student_id: 8,
      class_id: 1
    };
    const res = await request(app.callback()).post(`/class/addstudentToClassList`).send(student_class);
    expect(res.status).toBe(200);
  });

  test('test of invalid inputs', async () => {
    const student_class = {
      student_id: "hii",
      class_id: 1
    };
    const res = await request(app.callback()).post(`/class/addstudentToClassList`).send(student_class);

    expect(res.text).toBe('Invalid parameters passed');
    expect(res.status).toBe(400);
  });

  test('test of repetitive valid id inputs', async () => {
    const student_class = {
      student_id: 8,
      class_id: 1
    };
    const res = await request(app.callback()).post(`/class/addstudentToClassList`).send(student_class);

    expect(res.status).toBe(500);
  });
});

describe('Test for getstudentsByClass', () => {
  test('test of valid inputs', async () => {
    const classId = 1;
    const res = await request(app.callback()).get(`/class/getstudentsByClass/${classId}`);

    expect(res.status).toBe(200);
  });

  test('test of invalid inputs', async () => {
    const classId = "hii";
    const res = await request(app.callback()).get(`/class/getstudentsByClass/${classId}`);

    expect(res.text).toBe('Invalid parameters passed');
    expect(res.status).toBe(400);
  });

  test('test of non-existent valid inputs', async () => {
    const classId = 101;
    const res = await request(app.callback()).get(`/class/getstudentsByClass/${classId}`);
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('No student exists having given class ID');
  });
});
