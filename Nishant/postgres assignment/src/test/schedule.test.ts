import request from 'supertest';
import app from '../server';

describe('POST Requests', () => {
  test('test case 1', async () => { // add schedule od class
    const data = {
      classid: 106,
      classno: 6,
      subj_id: 6,
      subj_name: 'physics',
      t_id: 6,
      t_fname: 'brijesh',
    };
    const res = await request(app).post('/schedule').send(data);
    expect(res.status).toBe(200);
    expect(res.text).toBe('data is inserted in Class_schedule table');
  });
  test('test case 2', async () => { // classno must be positive
    const data = {
      classid: 106,
      classno: -6,
      subj_id: 6,
      subj_name: 'physics',
      t_id: 6,
      t_fname: 'brijesh',
    };
    const res = await request(app).post('/schedule').send(data);
    expect(res.status).toBe(400);
    expect(res.text).toBe('Bad Request');
  });
  test('test case 3', async () => { // classno is not present
    const data = {
      classid: 106,
      subj_id: 6,
      subj_name: 'physics',
      t_id: 6,
      t_fname: 'brijesh',
    };
    const res = await request(app).post('/schedule').send(data);
    expect(res.status).toBe(400);
    expect(res.text).toBe('Bad Request');
  });
});

app.close();
