const request = require("supertest");
var Test = require("./server");

describe('GET  v1/passengers', () => {
  test("testase 1", async () => {
    const response = await request(Test).get("/v1/passengers?page=0&size=10");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
  });
});


describe('POST  /v1/passengers', () => {

  test('should add passenger data', async () => {

    const passengerClass = {
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
    const response = await request(Test).post('/v1/passengers').send(passengerClass);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ mesg: "passenger created successfully" })

  })

})

describe('PUT  /v1/passenger/:id', () => {

  test('should  update passenger', async () => {
    const updatedpassengerdata = {
      "name": "Rohit Kumar",
      "trips": 743
    }
    const response = await request(Test).put('/v1/passengers/' + "5f1c59c9fa523c3aa793bf41").send(updatedpassengerdata);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ messege: "passenger data updated successfully" }
    );

  })

})
