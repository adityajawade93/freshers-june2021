const app = require('./passengers');
const request = require('supertest');


describe('GET /v1/passengers?page&size', () => {

    test('should get passenger list with right page and size ', async () => {
        const response = await request(app.callback()).get('/v1/passengers?page=0&size=10');
        expect(response.status).toBe(200);
    })

    test('should get error with wrong page and size ', async () => {
        const response = await request(app.callback()).get('/v1/passengers?page=1&size=10');
        expect(response.text).toBe("Given page no and size is not possible");
    })

})

describe('POST /v1/passengers', () => {

    let file = { "name": "Savina Budwig", "trips": 956, "airline": { "id": 5, "name": "Eva Air", "country": "Taiwan", "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png", "slogan": "Sharing the World, Flying Together", "head_quaters": "376, Hsin-Nan Rd., Sec. 1, Luzhu, Taoyuan City, Taiwan", "website": "www.evaair.com", "established": "1989" }, "__v": 0 }

    test('should create passenger successully ', async () => {
        const response = await request(app.callback()).post('/v1/passengers').send(file);
        expect(response.status).toBe(200);
    })

})

describe('PUT /v1/passengers/:id', () => {

    let passenger = {
        "name": "Helaina Kerek",
        "trips": 710,
        "airline": [
            {
                "_id": "5ef4a09eaab384a021750ce7",
                "id": 12,
                "name": "Sri Lankan Airways",
                "country": "Sri Lanka",
                "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/sri_lanka.png",
                "slogan": "From Sri Lanka",
                "head_quaters": "Katunayake, Sri Lanka",
                "website": "www.srilankaairways.com",
                "established": "1990",
                "__v": 0
            }
        ],
        "__v": 0
    }

    test('update the passenger with given id', async () => {
        const response = await request(app.callback()).put('/v1/passengers/5f1c59cbfa523c3aa793bff9').send(passenger);
        expect(response.status).toBe(200);
    })

    test('should get error if no passenger is present with given id', async () => {
        const response = await request(app.callback()).put('/v1/passengers/5f1c59cbfa500c3aa793bff9').send(passenger);
        expect(response.status).toBe(406);
    })

})
