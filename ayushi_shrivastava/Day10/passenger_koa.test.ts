const { test, expect, describe } = require('@jest/globals');
const request = require('supertest');
const app = require('./passenger_koa');

describe('Test for POST', () => {
  test('test of valid inputs', async () => {
    const task = {
    name: "Sagar Doe",
    trips: 259,
    airline: [
        {
            id: 5,
            name: "Eva Air",
            country: "Taiwan",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png",
            slogan: "Sharing the World, Flying Together",
            head_quarters: "376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan",
            website: "www.evaair.com",
            established: "1989"
        }
    ],
    __v: 0
    };
    const res = await request(app.callback()).post('/v1/passengers').send(task);

    expect(res.text).toBe('passenger named Sagar Doe inserted in database');
    expect(res.status).toBe(200);
  });

  test('test of invalid inputs', async () => {
    const task = {
    name: 79,
    trips: 259,
    airline: [
        {
            id: 5,
            name: "Eva Air",
            country: "Taiwan",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png",
            slogan: "Sharing the World, Flying Together",
            head_quarters: "376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan",
            website: "www.evaair.com",
            established: "1989"
        }
    ],
    __v: 0
    };
    const res = await request(app.callback()).post('/v1/passengers').send(task);

    expect(res.text).toBe('The Request is not valid');
    expect(res.status).toBe(400);
  });
});

describe('Test for GET', () => {
  test('test of valid inputs', async () => {
    const page: number = 1;
    const size: number = 2;
    const res = await request(app.callback()).get(`/v1/passengers?page=${page}&size=${size}`);

    expect(res.text).toBe(`[{
      "_id": "5ef4a412aab3841847750ce8",
      "name": "John Doe",
      "trips": 250,
      "airline": [
          {
              "id": 5,
              "name": "Eva Air",
              "country": "Taiwan",
              "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png",
              "slogan": "Sharing the World, Flying Together",
              "head_quaters": "376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan",
              "website": "www.evaair.com",
              "established": "1989"
          }
      ],
      "__v": 0
  },
  {
      "_id": "5ef4a412aab3841847750ce8",
      "name": "John Doe",
      "trips": 250,
      "airline": [
          {
              "id": 5,
              "name": "Eva Air",
              "country": "Taiwan",
              "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png",
              "slogan": "Sharing the World, Flying Together",
              "head_quaters": "376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan",
              "website": "www.evaair.com",
              "established": "1989"
          }
      ],
      "__v": 0
  }]`);
    expect(res.status).toBe(200);
  });

  test('test of invalid inputs', async () => {
    const page: number = 19;
    const size: number = 2;
    const res = await request(app.callback()).get(`/v1/passengers?page=${page}&size=${size}`);

    expect(res.text).toBe('data not fetched');
    expect(res.status).toBe(500);
  });
});
