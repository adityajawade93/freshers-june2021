const { test, expect, describe } = require('@jest/globals');
const request = require('supertest');
const app = require('./todoApi_koa');

describe('Test for POST', () => {
  test('test of valid inputs', async () => {
    const task = {
      title: 'tennis',
      completed: true,
    };
    const res = await request(app.callback()).post('/todo').send(task);

    expect(res.body.title).toBe('tennis');
    expect(res.body.completed).toBe(true);
    expect(res.status).toBe(200);
  });

  test('test of invalid title', async () => {
    const task = {
      title: 90,
      completed: true,
    };
    const res = await request(app.callback()).post('/todo').send(task);

    expect(res.text).toBe('invalid data in request');
    expect(res.status).toBe(400);
  });

  test('test of invalid boolean', async () => {
    const task = {
      title: 'io',
      completed: 89,
    };
    const res = await request(app.callback()).post('/todo').send(task);

    expect(res.text).toBe('invalid data in request');
    expect(res.status).toBe(400);
  });

  test('test of empty title', async () => {
    const task = {
      title: '',
      completed: true,
    };
    const res = await request(app.callback()).post('/todo').send(task);

    expect(res.text).toBe('please give a valid non-empty title');
    expect(res.status).toBe(400);
  });
});
