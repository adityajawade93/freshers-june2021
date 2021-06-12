/* eslint-disable */
const request = require('supertest');
const server = require('./index');

beforeAll(async () => {
  // do something before anything else runs
  console.log('Jest starting!');
});// close the server after each test

afterAll(() => {
  server.close();
  console.log('server closed!');
});

describe('basic route tests', () => {

  test('checking GET all task ', async () => {
    const task = {
      title: 'Histroy',
      completed: true
    };
    const task2 = {
      title: 'maths',
      completed: true
    };
    const res1 = await request(server).post('/todo').send((task));
    //console.log(res1.body);
    const res2 = await request(server).post('/todo').send((task2));
    console.log('//////////7////');
    //console.log(res2.body);
    const obj = {};
    obj[res1.body.id] = res1.body;
    obj[res2.body.id] = res2.body;

    console.log(obj);

    let getRes = await request(server).get('/todo');
    console.log(getRes.body);
    expect(getRes.body).toEqual(obj);
  });


  test('POST ROUTE CHECK', async () => {
    const task = {
      title: 'maths',
      completed: true,
    };
    const res = await request(server).post('/todo').send((task));

    expect(res.body.title).toEqual(task.title);
    expect(res.body.completed).toEqual(task.completed);
  });

  test('check for invalid data', async () => {
    const task = {
      title: '    ',
      completed: true,
    };
    const res = await request(server).post('/todo').send((task));
    // console.log('/////////2/////');
    // console.log(res.body);

    expect(res.text).toEqual('Task Creation Failed, Provide Correct data');
    expect(res.body).toEqual({});

  });

  test('check for invalid data', async () => {
    const task = {
      title: 'maths',
      completed: 123,
    };
    const res = await request(server).post('/todo').send((task));
    // console.log('/////////3/////');
    // console.log(res.body);

    expect(res.text).toEqual('Task Creation Failed, Provide Correct data');
    expect(res.body).toEqual({});

  });


  test('checking GET task by ID ', async () => {
    const task = {
      title: 'Histroy',
      completed: true
    };
    const res = await request(server).post('/todo').send((task));

    // console.log('//////////4////');  
    //   console.log(res.body);

    const id = res.body.id;
    let getRes = await request(server).get('/todo/' + id);
    expect(getRes.body).toEqual(res.body);
  });


  test('checking PUT/update task by ID ', async () => {
    const task = {
      title: 'Histroy',
      completed: true
    };

    const res = await request(server).post('/todo').send((task));
    const id = res.body.id;


    // console.log('//////////5.1////');  
    //   console.log(res.body);

    const task2 = {
      title: 'geography',
      completed: true
    };

    let getRes = await request(server).put('/todo/' + id).send((task2));

    // console.log('//////////5.2////');  
    // console.log(getRes.body);

    expect(getRes.body.title).toEqual(task2.title);
    expect(getRes.body.completed).toEqual(task2.completed);
    expect(getRes.body.date).toEqual(res.body.date);
    expect(getRes.body.id).toEqual(res.body.id);
  });

  test('checking DELETE task by ID ', async () => {
    const task = {
      title: 'Histroy',
      completed: true
    };

    const res = await request(server).post('/todo').send((task));
    const id = res.body.id;

    // console.log('//////////6////');  
    // console.log(res.body);

    let getRes = await request(server).delete('/todo/' + id);
    expect(getRes.text).toEqual('Delete Successful');
  });



});

