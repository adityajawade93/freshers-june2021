/* eslint-disable */
const request = require('supertest');
const { app, validUserInputTodoData, constructDate } = require('./index');

describe('Validate user input ToDo data', () => {
  test('valid data', () => {
    expect(validUserInputTodoData({
      title: 'todo 1',
    })).toBe(true);
  });

  // note that while validating user input to add todo data, only 'title' need to be checked
  test('valid data', () => {
    expect(validUserInputTodoData({
      title: 'todo 1',
      completed: true,
      createdDate: 'random string'
    })).toBe(true);
  });

  test('invalid data', () => {
    expect(validUserInputTodoData({
      completed: true,
    })).toBe(false);
  });
});

describe('Validate user input date while ToDo update', () => {
  test('valid data', () => {
    const day = 1;
    const month = 2;
    const year = 2000;
    const date = new Date(year, month-1, day);

    expect(constructDate(`${day}/${month}/${year}`)).toEqual(date);
  });

  test('valid data', () => {
    const day = 1;
    const month = 114;
    const year = 2000;
    const date = new Date(year, month-1, day);

    // no range restriction given for day, month and year 
    expect(constructDate(`${day}/${month}/${year}`)).toEqual(date);
  });

  test('invalid data', () => {
    expect(constructDate('23/234')).toEqual(null);
  });

  test('invalid data', () => {
    expect(constructDate('asd')).toEqual(null);
  });
});

describe('Add todo api', () => {
  test('valid data', async () => {
    const todo = {
      title: 'todo 1'
    };
    const response = await request(app.callback()).post('/todo').send(todo);
    expect(response.body.title).toBe(todo.title);
    expect(response.body.completed).toBe(false);
  });

  test('invalid data', async () => {
    const todo = {
      title: ' '
    };
    const response = await request(app.callback()).post('/todo').send(todo);
    expect(response.text).toEqual('Invalid data');
    expect(response.body).toEqual({});
  });

  test('invalid data', async () => {
    const todo = {};
    const response = await request(app.callback()).post('/todo').send(todo);
    expect(response.text).toEqual('Invalid data');
    expect(response.body).toEqual({});
  });
});