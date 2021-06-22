import request from 'supertest';
import { server } from './passenger';

beforeAll(async () => {
	console.log('Testing, jest starting...');
});

afterAll(() => {
	server.close();
	console.log('Testing finished! Server closed.');
});

describe('basic route tests', () => {
	let newEntry: Record<string, any>;
	beforeEach(() => {
		newEntry = {
			'name': 'kjsg',
			'trips': 250,
			'airline': [
				{
					'id': 5,
					'name': 'Eva Air',
					'country': 'Taiwan',
					'logo': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png',
					'slogan': 'Sharing the World, Flying Together',
					'head_quaters': '376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan',
					'website': 'www.evaair.com',
					'established': '1989'
				}
			],
			'__v': 0
		};
	});
	test('Correct response on wrong url.', async () => {
		const response = await request(server).get('/v1/passenger/5r23br2t3');
		expect(response.status).toEqual(400);
		expect(response.body.message).toBe('Page not found!');
	});

	test('Trying to edit Id which does not exist gives error status status.', async () => {
		const response = await request(server).put('/v1/passengers/:id');
		expect(response.status).toEqual(400);
		expect(response.body.message).toBe('Entry with Id : :id does not exist in database.');
	});

	test('Trying to post with wrong format data.', async () => {
		newEntry.name = 35; // "name" cannot be a Number
		const response = await request(server).post('/v1/passengers/').send(newEntry);
		expect(response.status).toEqual(406);
		expect(response.body.message).toBe('Not enough details provided./Wrong format data!');
	});

	test('Trying to post with incomplete data.', async () => {
		delete newEntry.name; // "name" is absent now
		const response = await request(server).post('/v1/passengers/').send(newEntry);
		expect(response.status).toEqual(406);
		expect(response.body.message).toBe('Not enough details provided./Wrong format data!');
	});

	test('Adding entry should return correct status.', async () => {
		const response = await request(server).post('/v1/passengers/').send(newEntry);
		expect(response.status).toEqual(201);
		expect(response.body.message).toBe('Entry added Successfully.');
		expect(response.body.content.trips).toBe(250);
	});

	test('Trying to edit with wrong format data.', async () => {
		const response1 = await request(server).post('/v1/passengers/').send(newEntry);
		newEntry.name = 8; // "name" cannot be a Number
		const response = await request(server).put('/v1/passengers/' + response1.body.content._id).send(newEntry);
		expect(response.status).toEqual(406);
		expect(response.body.message).toBe('Not enough details provided./Wrong format data!');
	});

	test('Trying to put with incomplete data.', async () => {
		const response1 = await request(server).post('/v1/passengers/').send(newEntry);
		delete newEntry.name; // "name" is now absent
		const response = await request(server).put('/v1/passengers/' + response1.body.content._id).send(newEntry);
		expect(response.status).toEqual(406);
		expect(response.body.message).toBe('Not enough details provided./Wrong format data!');
	});

	test('Updating existing entry.', async () => {
		const response1 = await request(server).post('/v1/passengers/').send(newEntry);
		// making legal changes
		newEntry.__v += 1; 
		newEntry.airline[0].id = 10;
		const response = await request(server).put('/v1/passengers/' + response1.body.content._id).send(newEntry);
		expect(response.status).toEqual(202);
		expect(response.body.message).toBe('Entry updated Successfully.');
		expect(response.body.content.airline[0].id).toBe(10);
	});

	test('Trying to get entries with missing query params...', async () => {
		const response = await request(server).get('/v1/passengers').query({ size: 3 });
		expect(response.status).toEqual(406);
		expect(response.body.message).toBe('Not enough details provided.');
	});

	test('Trying to get entries with out of range query...', async () => {
		await request(server).post('/v1/passengers/').send(newEntry);
		newEntry.trips = 1;
		await request(server).post('/v1/passengers/').send(newEntry);
		newEntry.name = 'bane';
		const response3 = await request(server).get('/v1/passengers').query({ page: 0, size: 3});
		const pages = response3.body.content.totalPages;
		const response = await request(server).get('/v1/passengers').query({ page: pages + 1, size: 3});
		expect(response.status).toEqual(416);
		expect(response.body.message).toBe('Query parameters out of range.');
	});

	test('Trying to get entries...', async () => {
		const responsei = await request(server).get('/v1/passengers').query({ page: 0, size: 3});
		await request(server).post('/v1/passengers/').send(newEntry);
		await request(server).post('/v1/passengers/').send(newEntry);
		await request(server).post('/v1/passengers/').send(newEntry);
		await request(server).post('/v1/passengers/').send(newEntry);
		const totalPassengers = responsei.body.content.totalPassengers + 4;
		const pages = Math.floor(totalPassengers/3) + 1;
		const response = await request(server).get('/v1/passengers').query({ page: 0, size: 3});
		expect(response.status).toEqual(200);
		expect(response.body.message).toBe('Request fulfiled.');
		expect(response.body.content.totalPages).toBe(pages);
		expect(response.body.content.totalPassengers).toBe(totalPassengers);
		expect(response.body.content.data.length).toBe(3);
	});
});