export{};
const app = require('../index.ts');
const { test, expect, describe } = require('@jest/globals');
const request = require('supertest');

describe('Test for getsubjectList', () => {
  test('test of normal working of this function', async () => {
    const res = await request(app.callback()).get(`/subject/getsubjectList`);
    expect(res.status).toBe(200);
  });
});

describe('Test for addsubjectToList', () => {
  test('test of valid inputs', async () => {
    const subject = {
      subject_id: 22,
	    subject_name: "Artificial Intelligence"
    };
    const res = await request(app.callback()).post(`/subject/addsubjectToList`).send(subject);

    expect(res.body.message).toBe('Subject inserted into subjects table');
    expect(res.status).toBe(200);
  });

  test('test of invalid inputs', async () => {
    const subject = {
      subject_id: "hii",
	    subject_name: "Artificial Intelligence"
    };
    const res = await request(app.callback()).post(`/subject/addsubjectToList`).send(subject);

    expect(res.text).toBe('Invalid parameters passed');
    expect(res.status).toBe(400);
  });

  test('test of repetitive valid id inputs', async () => {
    const subject = {
      subject_id: 1,
	    subject_name: "Artificial Intelligence"
    };
    const res = await request(app.callback()).post(`/subject/addsubjectToList`).send(subject);

    expect(res.status).toBe(500);
  });
});

describe('Test for updateSubjectToList', () => {
  test('test of valid inputs', async () => {
    const subject = {
      subject_id: 2,
	    subject_name: "Systems Design"
    };
    const res = await request(app.callback()).put(`/subject/updateSubjectToList`).send(subject);

    expect(res.body.message).toBe('Subject updated in subjects table');
    expect(res.status).toBe(200);
  });

  test('test of invalid inputs', async () => {
    const subject = {
      subject_id: "hii",
	    subject_name: "Systems Design"
    };
    const res = await request(app.callback()).put(`/subject/updateSubjectToList`).send(subject);

    expect(res.text).toBe('Invalid parameters passed');
    expect(res.status).toBe(400);
  });

  test('test of non-existent id inputs', async () => {
    const subject = {
      subject_id: 100,
	    subject_name: "Systems Design"
    };
    const res = await request(app.callback()).put(`/subject/updateSubjectToList`).send(subject);

    expect(res.status).toBe(500);
  });
});
