const server = require('../dist/index');
const request = require('supertest');


beforeAll(() => {

    console.log("Jest is starting now !");

})

afterAll(() => {

    server.close();
    console.log("Testing is finished !! ");
})

describe('GET  /v1/passenger', () => {

    test('should respond json', async () => {

        const response = await request(server).get('/v1/passenger?page=0&size=4');
        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty("_id");
        expect(response.body[0]).toHaveProperty("name");
        expect(response.body[0]).toHaveProperty("trips");
        expect(response.body[0]).toHaveProperty("airline");

    })

})

describe('POST  /v1/passenger', () => {

    test('should add passenger data', async () => {

        const passenger = {
            "name": "Cinderella Cath",
            "trips": 158,
            "airline": {
                "id": 1,
                "name": "Quatar Airways",
                "country": "Quatar",
                "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/300px-Qatar_Airways_Logo.svg.png",
                "slogan": "Going Places Together",
                "head_quaters": "Qatar Airways Towers, Doha, Qatar",
                "website": "www.qatarairways.com",
                "established": "1994"
            },
            "__v": 0
        }
        const response = await request(server).post('/v1/passenger').send(passenger);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            "msg": "passenger data saved"
        })


    })

})

describe('PUT  /v1/passenger/:passengerId', () => {

    test('should  update passenger', async () => {
        const updatedpassengerdata = {
            "name": "John agrawal",
            "trips": 2500
        }
        const response = await request(server).put('/v1/passenger/' + "5ef4a412aab3841847750ce8").send(updatedpassengerdata);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            "msg": "passenger data updated"
        })

    })

})
