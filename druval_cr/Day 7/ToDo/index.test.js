/* eslint-disable */
const request = require('supertest');
const { 
  app,
  validUserInputTodoData,
  constructDate,
} = require('./index');

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
      createdDate: 'random string',
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
  test('sent valid todo title', async () => {
    const todo = {
      title: 'todo 1',
      completed: true,
    };
    const response = await request(app.callback()).post('/todo').send(todo);
    expect(response.body.title).toBe(todo.title);
    // note that completed will be false by default, only title is checked in this request
    expect(response.body.completed).toBe(false);
  });

  test('sent invalid todo title', async () => {
    const todo = {
      title: ' ',
    };
    const response = await request(app.callback()).post('/todo').send(todo);
    expect(response.text).toEqual('Invalid data');
    expect(response.body).toEqual({});
  });

  test('sent empty object', async () => {
    const todo = {};
    const response = await request(app.callback()).post('/todo').send(todo);
    expect(response.text).toEqual('Invalid data');
    expect(response.body).toEqual({});
  });
});

describe('Update todo api', () => {
  test('update todo with valid [title, completed, createdDate]', async () => {
    const todo = {
      title: 'todo 1',
    };
    const addTodoResponse = await request(app.callback()).post('/todo').send(todo);

    const newParams = {
      title: 'todo 2',
      completed: true,
      createdDate: '2/3/1999',
    }
    const updateTodoResponse = await request(app.callback())
      .put(`/todo/${addTodoResponse.body.id}`)
      .send(newParams);

    expect(updateTodoResponse.body.title).toEqual(newParams.title);
    expect(updateTodoResponse.body.completed).toEqual(newParams.completed);
    const newDateParam = JSON.stringify(constructDate(newParams.createdDate)).slice(1, -1);
    expect(updateTodoResponse.body.createdDate).toEqual(newDateParam);
    expect(updateTodoResponse.body.id).toEqual(addTodoResponse.body.id);
  });

  test('update todo with valid [title] and invalid [completed, createdDate]', async () => {
    // here only title will be updated

    const todo = {
      title: 'todo 1',
    };
    const addTodoResponse = await request(app.callback()).post('/todo').send(todo);

    const newParams = {
      title: 'todo 2',
      completed: 'invalidString',
      createdDate: 'invalidString',
    }
    const updateTodoResponse = await request(app.callback())
      .put(`/todo/${addTodoResponse.body.id}`)
      .send(newParams);

    expect(updateTodoResponse.body.title).toEqual(newParams.title);
    expect(updateTodoResponse.body.completed).toEqual(addTodoResponse.body.completed);
    expect(updateTodoResponse.body.createdDate).toEqual(addTodoResponse.body.createdDate);
    expect(updateTodoResponse.body.id).toEqual(addTodoResponse.body.id);
  });

  test('sent invalid todo id', async () => {
    const newParams = {
      title: 'todo 2',
    }
    const invalidID = 'invalid';
    const updateTodoResponse = await request(app.callback())
      .put(`/todo/${invalidID}`)
      .send(newParams);

    expect(updateTodoResponse.text).toEqual(`ToDo with id: ${invalidID} not found`);
    expect(updateTodoResponse.body).toEqual({});
  });
});

describe('Get all todos api', () => {
  test('sent 2 valid todos, 1 invalid todo', async () => {
    const validTodo1 = {
      title: 'todo 1',
    };
    const validTodo2 = {
      title: 'todo 2',
    };
    const invalidTodo1 = {
      title: '',
    };

    let responseValidTodo1 = null;
    let responseValidTodo2 = null;
    let responseInvalidTodo1 = null;

    // better to use aysn here
    Promise.all([
      request(app.callback()).post('/todo').send(validTodo1),
      request(app.callback()).post('/todo').send(validTodo2),
      request(app.callback()).post('/todo').send(invalidTodo1),
    ])
    .then(response => {
      responseValidTodo1 = response[0];
      responseValidTodo2 = response[1];
      responseInvalidTodo1 = response[2];

      return request(app.callback()).get('/todo');
    })
    .then(response => {
      expect(response.body).toContainEqual(responseValidTodo1.body);
      expect(response.body).toContainEqual(responseValidTodo2.body);
      expect(response.body).not.toContainEqual(responseInvalidTodo1.body);
    })
  });
});

describe('Get todo api', () => {
  test('sent valid todo id', async () => {
    const todo = {
      title: 'todo 1',
    };
    const addTodoResponse = await request(app.callback()).post('/todo').send(todo);
    const id = addTodoResponse.body.id;

    const getTodoResponse = await request(app.callback()).get(`/todo/${id}`);

    expect(getTodoResponse.body).toEqual(addTodoResponse.body);
  });

  test('sent invalid todo id', async () => {
    const invalidID = 'invalid';
    const response = await request(app.callback()).get(`/todo/${invalidID}`);

    expect(response.text).toEqual(`ToDo with id: ${invalidID} not found`);
    expect(response.body).toEqual({});
  });
});

describe('Delete todo api', () => {
  test('sent valid todo id', async () => {
    const todo = {
      title: 'todo 1',
    };
    const addTodoResponse = await request(app.callback()).post('/todo').send(todo);
    const id = addTodoResponse.body.id;

    const deleteTodoResponse = await request(app.callback()).delete(`/todo/${id}`);

    expect(deleteTodoResponse.text).toEqual(`ToDo with id: ${id} is deleted`);
  });

  test('sent invalid todo id', async () => {
    const invalidID = 'invalid';
    const response = await request(app.callback()).delete(`/todo/${invalidID}`);

    expect(response.text).toEqual(`ToDo with id: ${invalidID} not found`);
    expect(response.body).toEqual({});
  });
});