import request from 'supertest';
import app from '../server';

describe('GET Requests', () => {
  test('test case 1', async () => { // get student list with pagination
    const page = 0;
    const size = 3;
    const res = await request(app).get(`/student?page=${page}&size=${size}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(size);
  });
});

describe('POST Requests', () => {
  test('test case 2', async () => { // add student in the list
    const data = {
      student_id: 11,
      fname: 'kashish',
      mname: 'raj',
      lname: 'rai',
      dob: '1967-08-10T18:30:00.000Z',
      gender: 'male',
      address: 'patna',
    };
    const res = (await request(app).post('/student').send(data));
    expect(res.status).toBe(200);
  });

  test('test case 3', async () => { // "gender" must be one of [male, female, others]
    const data = {
      student_id: 12,
      fname: 'kashish',
      mname: 'raj',
      lname: 'rai',
      dob: '1967-08-10T18:30:00.000Z',
      gender: 'M',
      address: 'patna',
    };
    const res = (await request(app).post('/student').send(data));
    expect(res.status).toBe(400);
    expect(res.text).toBe('Bad Request');
  });
});
app.close();
