const request = require('supertest');
const toDoApp = require('./toDoKoa');

test('Correct response on wrong url.', async () => {
	const response = await request(toDoApp.callback()).get('/tod/9327');
	expect(response.status).toEqual(400);
	expect(JSON.parse(response.text).message).toBe('Page not found!');
});

test('Trying to get entries if database is empty.', async () => {
	const response = await request(toDoApp.callback()).get('/todo/');
	expect(response.status).toEqual(200);
	expect(JSON.parse(response.text).message).toBe('No entries to display.');
});

test('Trying to get Id which does not exist gives error status status.', async () => {
	const response = await request(toDoApp.callback()).get('/todo/:id');
	expect(response.status).toEqual(404);
	expect(JSON.parse(response.text).message).toBe('Entry with Id : :id does not exist in database.');
});

test('Trying to get Id which does not exist gives error status status.', async () => {
	const response = await request(toDoApp.callback()).delete('/todo/:id');
	expect(response.status).toEqual(404);
	expect(JSON.parse(response.text).message).toBe('Entry with Id : :id does not exist in database.');
});

test('Trying to get Id which does not exist gives error status status.', async () => {
	const response = await request(toDoApp.callback()).put('/todo/:id');
	expect(response.status).toEqual(404);
	expect(JSON.parse(response.text).message).toBe('Entry with Id : :id does not exist in database.');
});

test('Trying to post with wrong format data.', async () => {
	const response = await request(toDoApp.callback()).post('/todo/')
		.send({
			title: 12,
			completed: 'true'
		});
	expect(response.status).toEqual(415);
	expect(JSON.parse(response.text).message).toBe('Only Strings(title) and Boolean(completed) allowed.');
});

test('Trying to post with incomplete data.', async () => {
	const response = await request(toDoApp.callback()).post('/todo/')
		.send({
			completed: 'true'
		});
	expect(response.status).toEqual(406);
	expect(JSON.parse(response.text).message).toBe('Not enough details provided.');
});

test('Adding entry should return correct status.', async () => {
	const response = await request(toDoApp.callback()).post('/todo/')
		.send({
			title: 'uicgw',
			completed: true
		});
	expect(response.status).toEqual(201);
	expect(JSON.parse(response.text).message).toBe('Entry added Successfully.');
	expect(JSON.parse(response.text).content.title).toBe('uicgw');
	expect(JSON.parse(response.text).content.completed).toBe(true);
});

test('Getting existing entry.', async () => {
	const response1 = await request(toDoApp.callback()).post('/todo/')
		.send({
			title: 'uicgw',
			completed: true
		});
	const Id = JSON.parse(response1.text).content.id;
	const response = await request(toDoApp.callback()).get('/todo/' + Id);
	expect(response.status).toEqual(200);
	expect(JSON.parse(response.text).message).toBe('Requested entry found.');
	expect(JSON.parse(response.text).content.title).toBe('uicgw');
	expect(JSON.parse(response.text).content.completed).toBe(true);
	expect(JSON.parse(response.text).content.id).toBe(Id);
});

test('Updating existing entry.', async () => {
	const response1 = await request(toDoApp.callback()).post('/todo/')
		.send({
			title: 'uicgw',
			completed: true
		});
	const Id = JSON.parse(response1.text).content.id;
	const response = await request(toDoApp.callback()).put('/todo/' + Id)
		.send({
			title: 'hi',
			completed: false
		});
	expect(response.status).toEqual(202);
	expect(JSON.parse(response.text).message).toBe('Entry updated Successfully.');
	expect(JSON.parse(response.text).content.title).toBe('hi');
	expect(JSON.parse(response.text).content.completed).toBe(false);
	expect(JSON.parse(response.text).content.id).toBe(Id);
});

test('Delete existing entry.', async () => {
	const response1 = await request(toDoApp.callback()).post('/todo/')
		.send({
			title: 'uicgw',
			completed: true
		});
	const Id = JSON.parse(response1.text).content.id;
	const response = await request(toDoApp.callback()).delete('/todo/' + Id);
	expect(response.status).toEqual(202);
	expect(JSON.parse(response.text).message).toBe('Entry deleted Successfully.');
});

test('Trying to update with wrong format data.', async () => {
	const response1 = await request(toDoApp.callback()).post('/todo/')
		.send({
			title: 'uicgw',
			completed: true
		});
	const Id = JSON.parse(response1.text).content.id;
	const response = await request(toDoApp.callback()).put('/todo/' + Id)
		.send({
			title: true,
			completed: 'euwhf'
		});
	expect(response.status).toEqual(415);
	expect(JSON.parse(response.text).message).toBe('Only Strings(title) and Boolean(completed) allowed.');
});

test('Trying to update with incomplete data.', async () => {
	const response1 = await request(toDoApp.callback()).post('/todo/')
		.send({
			title: 'uicgw',
			completed: true
		});
	const Id = JSON.parse(response1.text).content.id;
	const response = await request(toDoApp.callback()).put('/todo/' + Id)
		.send({});
	expect(response.status).toEqual(406);
	expect(JSON.parse(response.text).message).toBe('Not enough details provided.');
});

test('Trying to get all entries.', async () => {
	const response1 = await request(toDoApp.callback()).post('/todo/')
		.send({
			title: 'uicgw',
			completed: true
		});
	const Id1 = JSON.parse(response1.text).content.id;
	const response = await request(toDoApp.callback()).get('/todo/');
	expect(response.status).toEqual(200);
	expect(JSON.parse(response.text).message).toBe('Request fulfiled.');
	expect(Object.keys(JSON.parse(response.text).content)).toEqual(expect.arrayContaining([Id1]));
});