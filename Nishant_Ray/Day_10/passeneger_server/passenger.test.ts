const request = require('supertest');
const app = require('./passenger_server');

interface airline_data{
  id?: string| number;
  name?: string;
  country?: string;
  logo?: string;
  slogan?: string;
  head_quater?: string;
  website?: string;
  established?: number|string;
}
interface passenger1{
   name?:string;
   trips?:number;
   airline?: airline_data | airline_data[];
}


describe('GET Requests', () => {
test('testase 1', async () => {
    
    const res = await request(app.callback()).get('/v1/passengers?page=0&size=10');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(5);
  });
});

describe('POST Requests', () => {
    test('testase 2', async () => {
        const new_passenger:passenger1={
            "name": "Nishant",
            "trips": 100,
            "airline": {
                "id": 1,
                "name": "Quatar Airways",
                "country": "Quatar",
                "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/300px-Qatar_Airways_Logo.svg.png",
                "slogan": "Going Places Together",
                "website": "www.qatarairways.com",
                "established": "1994"
            }
        }
        const res = await request(app.callback()).get('/v1/passengers').send(new_passenger);
        
        expect(res.status).toBe(200);
      });
    });
