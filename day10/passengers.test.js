const request = require('supertest')
//const app = require('./passengers.js')
const { app, passengerdataarray, passengersdata } = require('./passengers.js')


test('get passengerdata for a given page and size', async () => {

    const response = await request(app.callback()).get('/v1/passengers?page=0&size=1')
    expect(response.status).toBe(200)
})

test('get error msg when page and size are not given properly', async () => {

    const response = await request(app.callback()).get('/v1/passengers?page=&size=10')
    expect(response.text).toBe('please give a proper pageno and size')
    expect(response.status).toBe(400)

})

test('created a passenger' , async () =>{
    const data ={
        "name": "sujit kumar",
        "trips": 500,
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




describe('update todo', () =>{

    const data ={
        "name": "sujit kumar",
        "trips": 700,
        "airline": {
          "id": 2,
          "name": "korean airlines",
          "country": "South korea",
          "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/250px-Singapore_Airlines_Logo_2.svg.png",
          "slogan": "A Great Way to Fly",
          "head_quaters": "Airline House, 25 Airline Road, Singapore 819829",
          "website": "www.singaporeair.com",
          "established": "1947"
        },
        "__v": 0
      }

    test('update a passengerdata' , async () =>{

        const response = await request(app.callback()).put('/v1/passengers/5f1c59c9fa523c3aa793bf3c').send(data)
        expect(response.body.name).toBe("sujit kumar")
        expect(response.body.airline.name).toBe("korean airlines")
        expect(response.body.trips).toBe(700)
        expect(response.status).toBe(200)
    })

    test('get error msg if id not given properly' , async () => {
        var id = "null"
        const response = await request(app.callback()).put('/v1/passengers/'+id).send(data)
        expect(response.text).toBe("please give a proper id")
        expect(response.status).toBe(400)
    })

    test('get error msg if name is not given properly' , async () => {
      var id = "5f1c59c9fa523c3aa793bf3c"
      const response = await request(app.callback()).put('/v1/passengers/'+id).send({
        "name":100,
        "trips":200
      })
      expect(response.text).toBe("please give a proper name")
      expect(response.status).toBe(400)
  })

    test('get error msg if the id is not in the passengerdata', async () => {
        const response = await request(app.callback()).put('/v1/passengers/bdhbjmgu9n4c74n').send(data)
        expect(response.text).toBe("id not found")
        expect(response.status).toBe(404)
    })

})