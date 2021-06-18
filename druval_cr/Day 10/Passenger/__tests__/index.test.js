const request = require('supertest');
const { 
  app,
  passerngerData,
  fetchPassengerData
} = require('../src/index');

// random number between min (included) and max (excluded)
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

describe('validate passenger get request', () => {
  test('invalid page, status', async () => {
    const page = -1;
    const size = 0;

    const response = await request(app.callback()).get(`/v1/passenger?page=${page}&size=${size}`);
    expect(response.status).toBe(400);
  });
  test('valid page, status', async () => {
    const page = 0;
    const size = 100;
    const data = fetchPassengerData(page, size);

    const response = await request(app.callback()).get(`/v1/passenger?page=${page}&size=${size}`);
    expect(response.status).toBe(200);
    expect(response.body.total).toEqual(passerngerData.length);
    expect(response.body.data_count).toEqual(data.length);
    expect(response.body.data).toEqual(data);
  });
  test('out of bound page, size', async () => {
    const page = passerngerData.length;
    const size = passerngerData.length;

    const response = await request(app.callback()).get(`/v1/passenger?page=${page}&size=${size}`);
    expect(response.status).toBe(200);
    expect(response.body.total).toEqual(passerngerData.length);
    expect(response.body.data_count).toEqual(0);
    expect(response.body.data).toEqual([]);
  });
});

describe('validate passenger post request', () => {
  test('invalid data (with no name)', async () => {
    const data = {
      trips: 100,
      __v: 7,
    }

    const response = await request(app.callback()).post('/v1/passenger').send(data);
    expect(response.status).toBe(400);
  });
  test('valid data', async () => {
    const data = {
      name: 'eva',
      trips: 100,
      __v: 7,
    }
    const defaultAirlineValue = {};

    const response = await request(app.callback()).post('/v1/passenger').send(data);
    expect(response.status).toBe(200);
    expect(response.body.total).toEqual(passerngerData.length);
    expect(response.body.data.name).toEqual(data.name.trim());
    expect(response.body.data.trips).toEqual(data.trips);
    expect(response.body.data.__v).toEqual(data.__v);
    expect(response.body.data.airline).toEqual(defaultAirlineValue);

    let filePassengerData = require('../passenger.json');
    expect(filePassengerData).toContainEqual(response.body.data);
  });
  test('invalid data (invalid trips, airline values)', async () => {
    const data = {
      name: 'eva',
      trips: '100',
      airline: 10,
    }

    const response = await request(app.callback()).post('/v1/passenger').send(data);
    expect(response.status).toBe(400);
  });
});

describe('validate passenger put request', () => {
  test('invalid data (invalid name, trips values)', async () => {
    const randomIndex = getRandomInteger(0, passerngerData.length);
    const randomID = passerngerData[randomIndex]._id;
    const data = {
      name: 77,
      trips: 'trips 100',
    }

    const response = await request(app.callback()).put(`/v1/passenger/${randomID}`).send(data);
    expect(response.status).toBe(400);
  });
  test('invalid data (invalid id)', async () => {
    const randomID = 'invalidID';
    const data = {
      name: 'eva',
      trips: 100,
    }

    const response = await request(app.callback()).put(`/v1/passenger/${randomID}`).send(data);
    expect(response.status).toBe(400);
  });
  test('valid data', async () => {
    const randomIndex = getRandomInteger(0, passerngerData.length);
    const randomID = passerngerData[randomIndex]._id;
    const data = {
      name: 'eva',
      trips: 100,
    }
    const currentPassengerData = passerngerData[randomIndex];

    const response = await request(app.callback()).put(`/v1/passenger/${randomID}`).send(data);
    expect(response.status).toBe(200);
    expect(response.body.total).toEqual(passerngerData.length);
    expect(response.body.data._id).toEqual(currentPassengerData._id);
    expect(response.body.data.name).toEqual(data.name.trim());
    expect(response.body.data.trips).toEqual(data.trips);
    expect(response.body.data.__v).toEqual(currentPassengerData.__v);
    expect(response.body.data.airline).toEqual(currentPassengerData.airline);

    let filePassengerData = require('../passenger.json');
    expect(filePassengerData).toContainEqual(response.body.data);
  });
});