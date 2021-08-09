import request from 'supertest';
import app from '../server';

describe('POST Requests', () => {
  test('test case 1', async () => { // add aubject
    const data = {
      subject_id: 6,
      subject_name: 'physics',
    };
    const res = (await request(app).post('/subject').send(data));
    expect(res.status).toBe(200);
    expect(res.text).toBe('data is inserted in Subject table');
  });

  test('test case 2', async () => { // subject_name is missing
    const data = {
      subject_id: 7,
    };
    const res = (await request(app).post('/subject').send(data));
    expect(res.status).toBe(400);
    expect(res.text).toBe('Bad Request');
  });
});

describe('GET Requests', () => {
  test('test case 3', async () => { // get subject list
    const res = await request(app).get('/subject');
    expect(res.status).toBe(200);
  });

  test('test case 4', async () => { // get the list of student under particular subject
    const subjectId = 1;
    const res = await request(app).get(`/subject/${subjectId}/student`);
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('student_id');
    expect(res.body[0]).toHaveProperty('fname');
  });

  test('test case 5', async () => { // get all subject marks obained by particular student
    const studentId = 1;
    const res = await request(app).get(`/student/${studentId}/subject/marks`);
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('subject_id');
    expect(res.body[0]).toHaveProperty('subject_name');
    expect(res.body[0]).toHaveProperty('marks');
  });
});
app.close();
