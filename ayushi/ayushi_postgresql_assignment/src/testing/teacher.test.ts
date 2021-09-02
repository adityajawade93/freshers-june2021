export{};
//const app = require('../index.ts');
const makeapp = require('../index.ts');
const Router = require('../routes/main.ts');
const app = makeapp(Router);
const { test, expect, describe } = require('@jest/globals');
const request = require('supertest');

describe('Test for getteacherList', () => {
  test('test of normal working of this function', async () => {
    const res = await request(app.callback()).get(`/teacher/getteacherList`);
    expect(res.status).toBe(200);
  });
});

describe('Test for addteacherToList', () => {
  test('test of valid inputs', async () => {
    const teacher = {
      teacher_id: 31,
      teacher_name: "Shreya Bansal",
      teacher_dob: "1997-04-12",
      teacher_address: '("Mumbai", "Juhu Beach")',
      teacher_gender: "female",
      teacher_phone: 7658555807
    };
    const res = await request(app.callback()).post(`/teacher/addteacherToList`).send(teacher);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Teacher inserted into teachers table');
    
  });

  test('test of invalid inputs', async () => {
    const teacher = {
      teacher_id: "hii",
      teacher_name: "Shreya Bansal",
      teacher_dob: "1997-04-12",
      teacher_address: '("Mumbai", "Juhu Beach")',
      teacher_gender: "female",
      teacher_phone: 7658555807
    };
    const res = await request(app.callback()).post(`/teacher/addteacherToList`).send(teacher);

    expect(res.text).toBe('Invalid parameters passed');
    expect(res.status).toBe(400);
  });

  test('test of duplicate id inputs that cannot be re-inserted', async () => {
    const teacher = {
      teacher_id: 1,
      teacher_name: "Shreya Bansal",
      teacher_dob: "1997-04-12",
      teacher_address: '("Mumbai", "Juhu Beach")',
      teacher_gender: "female",
      teacher_phone: 7658555807
    };
    const res = await request(app.callback()).post(`/teacher/addteacherToList`).send(teacher);

    expect(res.status).toBe(500);
  });
});

describe('Test for updateTeacherToList', () => {
  test('test of valid inputs', async () => {
    const teacher = {
      teacher_id: 31,
      teacher_name: "Shreya Malhotra",
      teacher_dob: "1997-04-12",
      teacher_address: '("Mumbai", "Juhu Beach")',
      teacher_gender: "female",
      teacher_phone: 7658555807
    };
    const res = await request(app.callback()).put(`/teacher/updateTeacherToList`).send(teacher);

    expect(res.text).toBe('Teacher updated in teachers table');
    expect(res.status).toBe(200);
  });

  test('test of invalid inputs', async () => {
    const teacher = {
      teacher_id: "hii",
      teacher_name: "Shreya Bansal",
      teacher_dob: "1997-04-12",
      teacher_address: '("Mumbai", "Juhu Beach")',
      teacher_gender: "female",
      teacher_phone: 7658555807
    };
    const res = await request(app.callback()).put(`/teacher/updateTeacherToList`).send(teacher);

    expect(res.text).toBe('Invalid parameters passed');
    expect(res.status).toBe(400);
  });

  test('test of non-existent id inputs', async () => {
    const teacher = {
      teacher_id: 57,
      teacher_name: "Shreya Bansal",
      teacher_dob: "1997-04-12",
      teacher_address: '("Mumbai", "Juhu Beach")',
      teacher_gender: "female",
      teacher_phone: 7658555807
    };
    const res = await request(app.callback()).put(`/teacher/updateTeacherToList`).send(teacher);

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Could not update teacher in teachers table: 0 rows returned on updation')
  });
});
