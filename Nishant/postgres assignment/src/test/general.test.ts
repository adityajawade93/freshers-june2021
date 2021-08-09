import request from 'supertest';
import app from '../server';

describe('GET Requests', () => {
  test('test case 1', async () => { // getting topper in particular subject and class and checking property in it
    const res = await request(app).get('/topper/class/104/subject/1');
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('student_id');
    expect(res.body[0]).toHaveProperty('fname');
    expect(res.body[0]).toHaveProperty('marks');
  });

  test('test case 2', async () => { // getting topper in particular class with count
    const count = 1;
    const classId = 103;
    const res = await request(app).get(`/toppers/class/${classId}/${count}`);
    expect(res.status).toBe(200);
    expect(Object.keys(res.body).length).toBe(count);
  });
});
app.close();
