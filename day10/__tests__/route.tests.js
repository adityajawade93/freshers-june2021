let request= require('supertest');

let {server, passangerData, fetchpassangerData} = require('../index.ts');

beforeAll(async()=>{
    console.log('testing started');
})

afterAll(()=>{
   server.close();
   console.log('server closed');
})

describe('get route validations',()=>{
    test('invalid page status',async()=>{
        let page=-1;
        let size=0;

        const response = await response(server).get(`/v1/passangers?page=${page}&size=${size}`);
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            "msg": "query incorrect"
        })
    })

    test('valid page', async()=>{
        let page= 0;
        let size= 4;

        const response = await response(server).get(`/v1/passangers?page=${page}&size=${size}`);
        expect(response.status).toBe(200);
        expect(response.body.total).toEqual(passangerData.legth);
        expect(response.body.this_page_length).toEqual(fetchpassangerData(page,size).length);
        expect(response.body.data).toEqual(fetchpassangerData(page,size));
    })

    test('out of bound page', async()=>{

        page=100;
        size=2;
        const response =await response(server).get(`/v1/passangers?page=${page}&size=${size}`);

        expect(response.status).toBe(200);
        expect(response.body.total).toEqual(passangerData.legth);
        expect(response.body.this_page_length).toEqual(0);
        expect(response.body.data).toEqual([]);
    })
})

describe('post route validation', ()=>{
    test('invalid request',async()=>{
        let inputdata = {
            name: 99,
            trips: 'hundred'
        }

        const response =await response(server).post('/v1/passangers').send(inputdata);

        expect(response.status).toBe(400);
        expect(response.body.Error).toEqual("Invalid Passanger data");
    })

    test('valid request', async()=>{
        let inputdata = {
            name:"joy",
            trips: 99,
            __v: 9,
            airline:{}
        }

        const response = await response(server).post('/v1/passangers').send(inputdata);

        expect(response.status).toBe(200);
        expect(response.body.status).toEqual("data added successfully");
        expect(response.body.newlength).toEqual(passangerData.length);
        expect(response.body.newData.name).toEqual(inputdata.name);
        expect(response.body.newData.trips).toEqual(inputdata.trips);
        expect(response.body.newData.airline).toEqual(inputdata.airline);
    })
})
