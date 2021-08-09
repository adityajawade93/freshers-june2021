import request from 'supertest';
import app from '../server';
import sqlclient from '../database/db';

describe('GET Requests', () => { // getting list of class
  test('test case 1', async () => {
    const res = await request(app).get('/class');
    expect(res.status).toBe(200);
  });

  test('test case 2', async () => { // getting student in particular class and also checking its length
    const len = await sqlclient.query('SELECT Count(*) FROM College.class_student where class_id=101');
    const res = await request(app).get('/class/101/student');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(Number(len.rows[0].count));
  });
});

describe('POST Requests', () => {
  test('test case 3', async () => { // addclass and check length of list of class after adding
    const data = {
      class_id: 101,
      studid: 11,

    };
    const len1 = await sqlclient.query('SELECT * FROM College.class_student');
    const res = (await request(app).post('/class').send(data));
    const len2 = await sqlclient.query('SELECT * FROM College.class_student');
    expect(res.status).toBe(200);
    expect(Number(len2.rows[0].count)).toBe(Number(len1.rows[0].count) + 1);
  });
});
app.close();
