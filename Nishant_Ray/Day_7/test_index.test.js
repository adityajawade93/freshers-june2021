const request = require('supertest');
const app = require('./index');

test('testase 1', async () => {
  const task = {
    title: 'assignment7',
    completed: true,
  };
  const res = await request(app.callback()).post('/todo').send(task);
  expect(res.body.title).toBe('assignment7');
  expect(res.body.completed).toBe(true);
  expect(res.status).toBe(200);
});

test('testase 2', async () => {
    const task = {
      title: '   ',
      completed: true,
    };
    const res = await request(app.callback()).post('/todo').send(task);
    expect(res.text).toBe('invalid data');
    expect(res.body.title).toBe(undefined);
    expect(res.body.completed).toBe(undefined);
    expect(res.status).toBe(404);
  });

  test('testase 3', async () => {
    const task = {
      title: 'algebra',
      completed: 'true',
    };
    const res = await request(app.callback()).post('/todo').send(task);
    expect(res.text).toBe('invalid data');
    expect(res.body).toEqual({});
    expect(res.status).toBe(404);
  });

  test('testase 4', async () => {
    const task = {
      title: 12345,
      completed: true,
    };
    const res = await request(app.callback()).post('/todo').send(task);
    expect(res.text).toBe('invalid data');
    expect(res.body).toEqual({});
    expect(res.status).toBe(404);
  });