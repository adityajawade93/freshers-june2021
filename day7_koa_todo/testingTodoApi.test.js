/* eslint-disable */
const request = require('supertest');
const app = require('./index');

test('POST ROUTE CHECK', async () => {
  const task = {
    title: 'maths',
    completed: true,
  };
  const res = await request(app.callback()).post('/todo').send(task);
  expect(res.body.title).toMatch(task.title);
  expect(res.body.completed).toBe(true);
});

test('invalid data', async () => {
  const task = {
    title: '    ',
    completed: true,
  };
  const res = await request(app.callback()).post('/todo').send(task);
  expect(res.text).toEqual('Task Creation Failed, Provide Correct data');
  expect(res.body).toEqual({});
});

test('invalid data', async () => {
  const task = {
    title: 'maths',
    completed: 123,
  };
  const res = await request(app.callback()).post('/todo').send(task);
  expect(res.text).toEqual('Task Creation Failed, Provide Correct data');
  expect(res.body).toEqual({});
});
