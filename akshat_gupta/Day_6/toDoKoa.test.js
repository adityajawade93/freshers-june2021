const request = require('supertest');
const toDoApp = require('./server');

beforeAll(async () => {
	console.log('Testing, jest starting...');
});

afterAll(() => {
	toDoApp.close();
	console.log('Testing finished! Server closed.');
});
describe('basic route tests', () => {
	test('Correct response on wrong url.', async () => {
		const response = await request(toDoApp).get('/tod/9327');
		expect(response.status).toEqual(400);
		expect(response.body.message).toBe('Page not found!');
	});

	test('Trying to get entries if database is empty.', async () => {
		const response = await request(toDoApp).get('/todo/');
		expect(response.status).toEqual(200);
		expect(response.body.message).toBe('No entries to display.');
	});

	test('Trying to get Id which does not exist gives error status status.', async () => {
		const response = await request(toDoApp).get('/todo/:id');
		expect(response.status).toEqual(404);
		expect(response.body.message).toBe('Entry with Id : :id does not exist in database.');
	});

	test('Trying to get Id which does not exist gives error status status.', async () => {
		const response = await request(toDoApp).delete('/todo/:id');
		expect(response.status).toEqual(404);
		expect(response.body.message).toBe('Entry with Id : :id does not exist in database.');
	});

	test('Trying to get Id which does not exist gives error status status.', async () => {
		const response = await request(toDoApp).put('/todo/:id');
		expect(response.status).toEqual(404);
		expect(response.body.message).toBe('Entry with Id : :id does not exist in database.');
	});

	test('Trying to post with wrong format data.', async () => {
		const response = await request(toDoApp).post('/todo/')
			.send({
				title: 12,
				completed: 'true'
			});
		expect(response.status).toEqual(415);
		expect(response.body.message).toBe('Only Strings(title) and Boolean(completed) allowed.');
	});

	test('Trying to post with incomplete data.', async () => {
		const response = await request(toDoApp).post('/todo/')
			.send({
				completed: 'true'
			});
		expect(response.status).toEqual(406);
		expect(response.body.message).toBe('Not enough details provided.');
	});

	test('Adding entry should return correct status.', async () => {
		const response = await request(toDoApp).post('/todo/')
			.send({
				title: 'uicgw',
				completed: true
			});
		expect(response.status).toEqual(201);
		expect(response.body.message).toBe('Entry added Successfully.');
		expect(response.body.content.title).toBe('uicgw');
		expect(response.body.content.completed).toBe(true);
	});

	test('Getting existing entry.', async () => {
		const response1 = await request(toDoApp).post('/todo/')
			.send({
				title: 'uicgw',
				completed: true
			});
		const Id = response1.body.content.id;
		const response = await request(toDoApp).get('/todo/' + Id);
		expect(response.status).toEqual(200);
		expect(response.body.message).toBe('Requested entry found.');
		expect(response.body.content.title).toBe('uicgw');
		expect(response.body.content.completed).toBe(true);
		expect(response.body.content.id).toBe(Id);
	});

	test('Updating existing entry.', async () => {
		const response1 = await request(toDoApp).post('/todo/')
			.send({
				title: 'uicgw',
				completed: true
			});
		const Id = response1.body.content.id;
		const response = await request(toDoApp).put('/todo/' + Id)
			.send({
				title: 'hi',
				completed: false
			});
		expect(response.status).toEqual(202);
		expect(response.body.message).toBe('Entry updated Successfully.');
		expect(response.body.content.title).toBe('hi');
		expect(response.body.content.completed).toBe(false);
		expect(response.body.content.id).toBe(Id);
	});

	test('Delete existing entry.', async () => {
		const response1 = await request(toDoApp).post('/todo/')
			.send({
				title: 'uicgw',
				completed: true
			});
		const Id = response1.body.content.id;
		const response = await request(toDoApp).delete('/todo/' + Id);
		expect(response.status).toEqual(202);
		expect(response.body.message).toBe('Entry deleted Successfully.');
	});

	test('Trying to update with wrong format data.', async () => {
		const response1 = await request(toDoApp).post('/todo/')
			.send({
				title: 'uicgw',
				completed: true
			});
		const Id = response1.body.content.id;
		const response = await request(toDoApp).put('/todo/' + Id)
			.send({
				title: true,
				completed: 'euwhf'
			});
		expect(response.status).toEqual(415);
		expect(response.body.message).toBe('Only Strings(title) and Boolean(completed) allowed.');
	});

	test('Trying to update with incomplete data.', async () => {
		const response1 = await request(toDoApp).post('/todo/')
			.send({
				title: 'uicgw',
				completed: true
			});
		const Id = response1.body.content.id;
		const response = await request(toDoApp).put('/todo/' + Id)
			.send({});
		expect(response.status).toEqual(406);
		expect(response.body.message).toBe('Not enough details provided.');
	});

	test('Trying to get all entries.', async () => {
		const response1 = await request(toDoApp).post('/todo/')
			.send({
				title: 'uicgw',
				completed: true
			});
		const Id1 = response1.body.content.id;
		const response = await request(toDoApp).get('/todo/');
		expect(response.status).toEqual(200);
		expect(response.body.message).toBe('Request fulfiled.');
		expect(Object.keys(response.body.content)).toEqual(expect.arrayContaining([Id1]));
	});
});