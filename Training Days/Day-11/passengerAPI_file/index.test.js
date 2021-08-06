const request = require('supertest');
const { app, passengers } = require('./index');

describe('GET Request', () => {
    test('invalid page, status', async () => {
        const page = -1;
        const size = 0;    
        const response = await request(app.callback()).get(`/v1/passenger?page=${page}&size=${size}`);
        expect(response.status).toBe(400);
    });
    test('invalid size, status', async () => {
        const page = 0;
        const size = -10;    
        const response = await request(app.callback()).get(`/v1/passenger?page=${page}&size=${size}`);
        expect(response.status).toBe(400);
    });
    test('valid page, status', async () => {
        const page = 0;
        const size = 10;
        const data = passengers.slice(page * size, Math.min( (page + 1) * size, passengers.length) );
        const total_page = Math.ceil(passengers.length / size);
        const response = await request(app.callback()).get(`/v1/passenger?page=${page}&size=${size}`);
        expect(response.status).toBe(200);
        expect(response.body.totalPassengers).toEqual(passengers.length);
        expect(response.body.totalPages).toEqual(total_page);
        expect(response.body.data).toEqual(data);
    });
    test('out of bound page', async () => {
        const page = passengers.length;
        const size = passengers.length;
        const response = await request(app.callback()).get(`/v1/passenger?page=${page}&size=${size}`);
        expect(response.status).toBe(406);
        expect(response.text).toBe("Invalid page number");
    });
    test('out of bound size', async () => {
        const page = 0;
        const size = 0;
        const response = await request(app.callback()).get(`/v1/passenger?page=${page}&size=${size}`);
        expect(response.status).toBe(400);
        expect(response.text).toBe("Invalid parameters");
    });
});

describe('POST request', () => {
    // test('invalid data (with no name)', async () => {
    //     const data = {
    //     trips: 100,
    //     __v: 7,
    //     }

    //     const response = await request(app.callback()).post('/v1/passenger').send(data);
    //     expect(response.status).toBe(400);
    // });
    test('Valid Data', async () => {
        const data = {
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
        }
        const response = await request(app.callback()).post('/v1/passenger').send(data);
        const id = response.text.substring(39);
        console.log(id);
        expect(response.status).toBe(201);
        expect(response.text).toBe(`passenger created successfully with id ${id}`);
        // expect(response.body.total).toEqual(passerngerData.length);
        // expect(response.body.data.name).toEqual(data.name.trim());
        // expect(response.body.data.trips).toEqual(data.trips);
        // expect(response.body.data.__v).toEqual(data.__v);
        // expect(response.body.data.airline).toEqual(defaultAirlineValue);

        // let filePassengerData = require('./passengers.json');
        // expect(filePassengerData).toContainEqual(response.body.data);
    });
});

describe('PUT request', () => {
    test('invalid id', async () => {
        const randomID = 'invalidID';
        const data = {
            name: 'eva',
            trips: 100,
        }

        const response = await request(app.callback()).put(`/v1/passenger/${randomID}`).send(data);
        expect(response.status).toBe(406);
    });
    test('valid data', async () => {
        // const randomIndex = getRandomInteger(0, passengers.length);
        const randomID = passengers[passengers.length-1]._id;
        const data = {
            name: 'eva',
            trips: 100,
        }
        const currentPassengerData = passengers[passengers.length-1];

        const response = await request(app.callback()).put(`/v1/passenger/${randomID}`).send(data);
        expect(response.status).toBe(200);
        expect(response.text).toBe(`passenger updated successfully with id ${randomID}`);
        // expect(response.body.total).toEqual(passengers.length);
        // expect(response.body.data._id).toEqual(currentPassengerData._id);
        // expect(response.body.data.name).toEqual(data.name.trim());
        // expect(response.body.data.trips).toEqual(data.trips);
        // expect(response.body.data.__v).toEqual(currentPassengerData.__v);
        // expect(response.body.data.airline).toEqual(currentPassengerData.airline);

        // let filePassengerData = require('../passenger.json');
        // expect(filePassengerData).toContainEqual(response.body.data);
    });
  });
  