const request = require('supertest')
const app = require('./index')

test('POST ROUTE CHECK', async () => {
    const task = {
        title:'Maths', content: 'geometry', completed: true
    }
    const res = await request(app.callback()).post('/todo').send(task);
    expect(res.body.title).toMatch(task.title);
    expect(res.body.content).toMatch(task.content);
    expect(res.body.completed).toBe(true);
  });

  test('Invalid Data', async () => {
    const task = {
        title:'  ', content: 'jhfgdjs', completed: true
    }
    const res = await request(app.callback()).post('/todo').send(task);
    expect(res.text).toMatch('invalid data');
    expect(res.status).toBe(404);
  });

  test('', async () => {
    const task = {
        title:'Maths', content: 'geometry', completed: 'true'
    }
    const res = await request(app.callback()).post('/todo').send(task);
    expect(res.text).toMatch('invalid data');
    expect(res.body).toEqual({});
  });

  test('Invalid data', async () => {
    const task = {
        title:'Maths', content: 1234, completed: true
    }
    const res = await request(app.callback()).post('/todo').send(task);
    expect(res.text).toMatch('invalid data');
    expect(res.body).toEqual({});
    expect(res.status).toBe(404);
  });

