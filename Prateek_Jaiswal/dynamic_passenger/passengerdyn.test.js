const request = require('supertest');
const { app, tempholdarray, temphold } = require('./passengerdyn.js')


test("get passenger's data for a given page or size", async () => {

    const response = await request(app.callback()).get('/v1/passengers?page=0&size=1')
    expect(response.status).toBe(200)
})

test('get error msg when page and size are invalid', async () => {

    const response = await request(app.callback()).get('/v1/passengers?page=&size=101')
    expect(response.text).toBe('error: invalid page no or size')
    expect(response.status).toBe(400)

})

test('creating a passenger' , async () =>{
    const data ={
        "name": "Louis Layne",
        "trips": 120,
        "airline": {
          "id": 2,
          "name": "Singapore Airlines",
          "country": "Singapore",
          "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png",
          "slogan": "A Great Way to Fly",
          "head_quaters": "Airline House, 25 Airline Road, Singapore 819829",
          "website": "www.singaporeair.com",
          "established": "1947"
        },
        "__v": 0
      }
    const response = await request(app.callback()).post('/v1/passengers').send(data) 
    expect(response.status).toBe(200)
    expect(response.text).toBe("passenger successfully created")
})




describe('updating a passenger details', () =>{

    const data1 ={
        "name": "Prateek",
        "trips": 432,
        "airline": {
          "id": 2,
          "name": "Singapore Airlines",
          "country": "Singapore",
          "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png",
          "slogan": "A Great Way to Fly",
          "head_quaters": "Airline House, 25 Airline Road, Singapore 819829",
          "website": "www.singaporeair.com",
          "established": "1947"
        },
        "__v": 0
      }
      

    test("updating a passenger's data" , async () =>{

        const response = await request(app.callback()).put('/v1/passengers/60c0519d7fdc6a08a23399ce').send(data1)
        expect(response.text).toBe("passenger with 60c0519d7fdc6a08a23399ce updated successfully")
        expect(response.status).toBe(200)
    })

    test('error message if invalid id' , async () => {
        var id = "null"
        const response = await request(app.callback()).put('/v1/passengers/'+id).send(data1)
        expect(response.text).toBe("error: invalid id")
        expect(response.status).toBe(400)
    })

    test('error message if invalid name type' , async () => {
      var id = "60c0519d7fdc6a08a23399ce"
      const response = await request(app.callback()).put('/v1/passengers/'+id).send({
        "name":100,
        "trips":200
      })
      expect(response.text).toBe("error: invalid name type")
      expect(response.status).toBe(400)
  })

    test('error if id not found', async () => {
        const response = await request(app.callback()).put('/v1/passengers/bdhbjmgu9n4c74n').send(data1)
        expect(response.text).toBe("error: id not found")
        expect(response.status).toBe(404)
    })

})