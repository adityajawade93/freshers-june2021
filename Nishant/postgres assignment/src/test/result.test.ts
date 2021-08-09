import request from 'supertest';
import app from '../server';

describe('POST Requests', () => {
  test('test case 1', async () => { // add result of the student
    const data = {
      result_id: 10021,
      studentid: 11,
      clas_id: 101,
      subjectid: 4,
      marks: 79,
    };
    const res = await request(app).post('/result').send(data);
    expect(res.status).toBe(200);
    expect(res.text).toBe('data is inserted in result table');
  });
});
describe('PUT Requests', () => {
  test('test case 2', async () => { //  subject must be opted by student
    const data = {
      studentid: 11,
      subjectid: 2,
      marks: 100,
    };
    const res = await request(app).put('/result').send(data);
    expect(res.status).toBe(400);
    expect(res.text).toBe('This subject is not opted by the student');
  });

  test('test case 3', async () => { // update marks
    const data = {
      studentid: 11,
      subjectid: 4,
      marks: 100,
    };
    const res = await request(app).put('/result').send(data);
    expect(res.status).toBe(200);
    expect(res.text).toBe('marks are updated in result table');
  });

  test('test case 4', async () => { // marks should be less than or equal to 100
    const data = {
      studentid: 11,
      subjectid: 4,
      marks: 101,
    };
    const res = await request(app).put('/result').send(data);
    expect(res.status).toBe(400);
    expect(res.text).toBe('Bad Request');
  });

  test('test case 5', async () => { // marks should be positive or 0
    const data = {
      studentid: 11,
      subjectid: 4,
      marks: -2,
    };
    const res = await request(app).put('/result').send(data);
    expect(res.status).toBe(400);
    expect(res.text).toBe('Bad Request');
  });
});
app.close();
