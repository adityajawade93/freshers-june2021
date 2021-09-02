export{};
//const app = require('../index.ts');
const makeapp = require('../index.ts');
const Router = require('../routes/main.ts');
const app = makeapp(Router);
const { test, expect, describe } = require('@jest/globals');
const request = require('supertest');

describe('Test for getstudentList', () => {
  test('test of invalid inputs', async () => {
    const page = 1;
    const size = "hii";
    const res = await request(app.callback()).get(`/student/getstudentList?page=${page}&size=${size}`);
    expect(res.status).toBe(400);
    expect(res.text).toBe('Invalid parameters passed');
    
  });

  test('test of valid inputs', async () => {
    const page = 1;
    const size = 5;
    const res = await request(app.callback()).get(`/student/getstudentList?page=${page}&size=${size}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Student list for given page and size');
    
  });

  test('test of non-existent valid inputs', async () => {
    const page = 9;
    const size = 10;
    const res = await request(app.callback()).get(`/student/getstudentList?page=${page}&size=${size}`);

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('data not fetched: page no. or size is out of range');
  });
});

describe('Test for getstudentInfoByStudentId', () => {
  test('test of invalid inputs', async () => {
    const studentId = "hii";
    const res = await request(app.callback()).get(`/student/getstudentInfoByStudentId/${studentId}`);
    expect(res.status).toBe(400);
    expect(res.text).toBe('Invalid parameters passed');
    
  });

  test('test of valid inputs', async () => {
    const studentId = 1;
    const res = await request(app.callback()).get(`/student/getstudentInfoByStudentId/${studentId}`);
    expect(res.status).toBe(200);
  });

  test('test of non-existent valid inputs', async () => {
    const studentId = 100;
    const res = await request(app.callback()).get(`/student/getstudentInfoByStudentId/${studentId}`);
    expect(res.status).toBe(500);
    expect(res.body.error).toBe('The Request is not valid');
  });
});

describe('Test for addstudentToList', () => {
  test('test of valid inputs', async () => {
    const student = {
      student_id: 30,
      student_name: "Samiksha Shrivastava",
      student_dob: "1996-04-12",
      student_address: '("Gwalior", "Morar")',
      student_gender: "female",
      student_phone: 7655959657
    };
    const res = await request(app.callback()).post(`/student/addstudentToList`).send(student);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Student inserted into students table');
    
  });

  test('test of invalid inputs', async () => {
    const student = {
      student_id: "hii",
      student_name: "Samiksha Shrivastava",
      student_dob: "1996-04-12",
      student_address: '("Gwalior", "Morar")',
      student_gender: "female",
      student_phone: "7655959657"
    };
    const res = await request(app.callback()).post(`/student/addstudentToList`).send(student);
    expect(res.status).toBe(400);
    expect(res.text).toBe('Invalid parameters passed');
    
  });

  test('test of duplicate id inputs that cannot be re-inserted', async () => {
    const student = {
      student_id: 1,
      student_name: "Samiksha Shrivastava",
      student_dob: "1996-04-12",
      student_address: '("Gwalior", "Morar")',
      student_gender: "female",
      student_phone: "7655959657"
    };
    const res = await request(app.callback()).post(`/student/addstudentToList`).send(student);

    expect(res.status).toBe(500);
  });
});

describe('Test for updatestudentToList', () => {
  test('test of valid inputs', async () => {
    const student = {
      student_id: 30,
      student_name: "Samiksha Agarwal",
      student_dob: "1996-04-12",
      student_address: '("Gwalior", "Morar")',
      student_gender: "female",
      student_phone: 7655959657
    };
    const res = await request(app.callback()).put(`/student/updatestudentToList`).send(student);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Student updated in students table');
    
  });

  test('test of invalid inputs', async () => {
    const student = {
      student_id: 31,
      student_name: "Samiksha Shrivastava",
      student_dob: "1996-04-12",
      student_address: 40,
      student_gender: "female",
      student_phone: "7655959657"
    };
    const res = await request(app.callback()).put(`/student/updatestudentToList`).send(student);
    expect(res.status).toBe(400);
    expect(res.text).toBe('Invalid parameters passed');
    
  });

  test('test of non-existent id inputs', async () => {
    const student = {
      student_id: 108,
      student_name: "Samiksha Shrivastava",
      student_dob: "1996-04-12",
      student_address: '("Gwalior", "Morar")',
      student_gender: "female",
      student_phone: "7655959657"
    };
    const res = await request(app.callback()).put(`/student/updatestudentToList`).send(student);

    expect(res.status).toBe(500);
    expect(res.body.error).toBe('Could not update student in students table: 0 rows updated');
  });
});
