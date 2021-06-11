const request = require('supertest');
const toDoApp = require('./toDoKoa');

test('Correct response on wrong url.', async () => {
    const response = await request(toDoApp.callback()).get('/tod/9327');
    expect(response.status).toEqual(400);
    expect(response.text).toBe('Page not found!');
});

test('Trying to get entries if database is empty.', async () => {
    const response = await request(toDoApp.callback()).get('/todo/');
    expect(response.status).toEqual(200);
    expect(response.text).toBe('No entries to display.');
});

test('Trying to get Id which does not exist gives error status status.', async () => {
    const response = await request(toDoApp.callback()).get('/todo/:id');
    expect(response.status).toEqual(400);
    expect(response.text).toBe('Entry with Id : :id does not exist in database.');
});

test('Trying to get Id which does not exist gives error status status.', async () => {
    const response = await request(toDoApp.callback()).delete('/todo/:id');
    expect(response.status).toEqual(400);
    expect(response.text).toBe('Entry with Id : :id does not exist in database.');
});

test('Trying to get Id which does not exist gives error status status.', async () => {
    const response = await request(toDoApp.callback()).put('/todo/:id');
    expect(response.status).toEqual(400);
    expect(response.text).toBe('Entry with Id : :id does not exist in database.');
});

test('Trying to post with wrong format data.', async () => {
    const response = await request(toDoApp.callback()).post('/todo/')
    .send({
            "title": 12,
            "completed": "true"
        });
    expect(response.status).toEqual(415);
    expect(response.text).toBe('Only Strings(title) and Boolean(completed) allowed.');
});

test('Trying to post with incomplete data.', async () => {
    const response = await request(toDoApp.callback()).post('/todo/')
    .send({
            "completed": "true"
        });
    expect(response.status).toEqual(406);
    expect(response.text).toBe('Not enough details provided.');
});

test('Adding entry should return correct status.', async () => {
    const response = await request(toDoApp.callback()).post('/todo/')
    .send({
            "title":"uicgw",
            "completed": true
        });
    expect(response.status).toEqual(201);
    expect(response.text).toBe('Entry added Successfully.');
});