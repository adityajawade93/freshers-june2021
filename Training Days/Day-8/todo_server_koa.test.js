const request = require('supertest');
const app = require('./todo_server_koa');

test('GET TEST WITHOUT PARAM', async () => {
  const res = await request(app.callback()).get('/todo');
  expect(res.body).toEqual([{"discription": "NodeJS Assignment of TODO List", "id": "cd3974ea-4447-433c-be74-7c44bca4f91e", "title": "assignment-1"}, {"discription": "NodeJS Assignment of File R/W", "id": "cd3974ea-4447-433c-be74-7c44bca4f91f", "title": "assignment-1"}]);
});

test('GET TEST WITH VALID ID', async () => {
  const res = await request(app.callback()).get('/todo/cd3974ea-4447-433c-be74-7c44bca4f91e');
  expect(res.body).toEqual({"discription": "NodeJS Assignment of TODO List", "id": "cd3974ea-4447-433c-be74-7c44bca4f91e", "title": "assignment-1"});
});

test('GET TEST WITH INVALID ID', async () => {
  const res = await request(app.callback()).get('/todo/cd3974ea-4447-be74-7c44bca4f91e');
  console.log(res.text);
  expect(res.text).toBe("invalid id passed");
});

test('GET TEST WITH ABSENT ID', async () => {
  const res = await request(app.callback()).get('/todo/cd3974ea-4447-433c-be74-7c44bca4f91a');
  console.log(res.text);
  expect(res.text).toBe("given id is not present");
});

test('POST TEST WITH VALID DATA', async () => {
  const todo = {
    title: 'maths',
    discription: 'desc of maths task',
  };
  const res = await request(app.callback()).post('/todo').send(todo);
  let result = await request(app.callback()).get('/todo');
  expect(res.body).toEqual(result.body);
});

test('POST TEST WITH INVALID DATA', async () => {
  const todo = {
    title: '',
    discription: 'desc of maths task',
  };
  const res = await request(app.callback()).post('/todo').send(todo);
  // let result = await request(app.callback()).get('/todo');
  expect(res.text).toEqual("Title should not be empty");
});

test('PUT TEST WITH VALID ID and DATA', async () => {
  const todo = {
    title: 'maths',
    discription: 'desc of maths task',
  };
  const res = await request(app.callback()).put('/todo/cd3974ea-4447-433c-be74-7c44bca4f91e').send(todo);
  let result = await request(app.callback()).get('/todo/cd3974ea-4447-433c-be74-7c44bca4f91e');
  expect(res.body).toEqual(result.body);
});

test('PUT TEST WITH INVALID ID', async () => {
  const todo = {
    title: '',
    discription: 'desc of maths task',
  };
  const res = await request(app.callback()).put('/todo/cd3974e-433c-be74-7c44bca4f91e').send(todo);
  // let result = await request(app.callback()).get('/todo');
  expect(res.text).toEqual("invalid id passed");
});

test('PUT TEST WITH ABSENT ID', async () => {
  const todo = {
    title: 'maths',
    discription: 'desc of maths task',
  };
  const res = await request(app.callback()).put('/todo/dd3974ea-4447-433c-be74-7c44bca4f91e').send(todo);
  // let result = await request(app.callback()).get('/todo');
  expect(res.text).toEqual("given id is not present");
});

test('PUT TEST WITH INVALID DATA', async () => {
  const todo = {
    title: '',
    discription: 'desc of maths task',
  };
  const res = await request(app.callback()).put('/todo/cd3974ea-4447-433c-be74-7c44bca4f91e').send(todo);
  // let result = await request(app.callback()).get('/todo');
  expect(res.text).toEqual("Title should not be empty");
});

test('DELETE TEST WITH VALID ID', async () => {
  const res = await request(app.callback()).delete('/todo/cd3974ea-4447-433c-be74-7c44bca4f91e');
  let result = await request(app.callback()).get('/todo/');
  expect(res.body).toEqual(result.body);
});

test('DELETE TEST WITH INVALID ID', async () => {
  const res = await request(app.callback()).delete('/todo/cd3974ea-4447-be74-7c44bca4f91e');
  console.log(res.text);
  expect(res.text).toBe("invalid id passed");
});

test('DELETE TEST WITH ABSENT ID', async () => {
  const res = await request(app.callback()).delete('/todo/cd3974ea-4447-433c-be74-7c44bca4f91a');
  console.log(res.text);
  expect(res.text).toBe("given id is not present");
});
