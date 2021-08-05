import request from 'supertest';
import app from '../server';

describe('POST Requests', () => {
  test('test case 1', async () => { // add teacher
    const data = {
      teacher_id: 6,
      fname: 'brijesh',
      mname: 'kumar',
      lname: 'meena',
      dob: '1967-08-10T18:30:00.000Z',
      gender: 'male',
      address: 'jaipur',
    };
    const res = (await request(app).post('/teacher').send(data));
    expect(res.status).toBe(200);
    expect(res.text).toBe('data is inserted in Subject table');
  });

  test('test case 2', async () => { // add teacher but with already present id
    const data = {
      teacher_id: 6,
      fname: 'brijesh',
      mname: 'kumar',
      lname: 'meena',
      dob: '1967-08-10T18:30:00.000Z',
      gender: 'male',
      address: 'jaipur',
    };
    const res = (await request(app).post('/teacher').send(data));
    expect(res.status).toBe(500);
  });

  test('test case 3', async () => { // gender must be 'male,'female' or 'others'
    const data = {
      teacher_id: 6,
      fname: 'brijesh',
      mname: 'kumar',
      lname: 'meena',
      dob: '1967-08-10T18:30:00.000Z',
      gender: 'M',
      address: 'jaipur',
    };
    const res = (await request(app).post('/teacher').send(data));
    expect(res.status).toBe(400);
    expect(res.text).toBe('Bad Request');
  });
});

describe('GET Requests', () => {
  test('test case 4', async () => { // get teacher list
    const res = await request(app).get('/teacher');
    expect(res.status).toBe(200);
  });

  test('test case 5', async () => { // get the list of student under particular teacher
    const teacherId = 1;
    const res = await request(app).get(`/teacher/${teacherId}/student`);
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('student_id');
    expect(res.body[0]).toHaveProperty('fname');
  });
});
app.close();
