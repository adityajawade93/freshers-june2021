import { app } from '../app/index'
import * as studentservice from '../services/students'
import * as dataoutput from '../customoutput/dataoutput'
import { setPath } from '../database/clientdb'
const request = require('supertest')

beforeAll(async () => {
    await setPath()
})



test('get students', async () => {

    const response2 = await request(app.callback()).get('/school/students?page=0&size=3')
    expect(response2.status).toBe(200)

})

test('get student by id', async () => {
    const response = await request(app.callback()).get('/school/studentid/56a6af4a-b323-450e-aaa0-04cfdab6fa59/students')
    //console.log(response.body)
    expect(response.body.data[0].fname).toBe('sujit')

})

test('get student by teacher id', async () => {
    const response = await request(app.callback()).get('/school/teacherid/9360ef49-47d7-489e-94e9-2867ad886ff4/students')
    expect(response.body.totalcount).toBe(6)
})

test('get student by subject', async () => {
    const response = await request(app.callback()).get('/school/subjectname/physics/students')
    expect(response.body.totalcount).toBe(3)
})

test('add students', async () => {
    const data = {
        fname: "lenerd",
        lname: "hofstaterd",
        dateofbirth: "11-4-2002"
    }
    const response = await request(app.callback()).post('/school/addstudent/students').send(data)
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({ "status": 200, "message": "student successfully added" })
})

describe('errors', () => {
    test('get error if page number is not given', async () => {

        const response2 = await request(app.callback()).get('/school/students?size=3')
        expect(response2.status).toBe(500)

    })

    test('get error if  id is wrong', async () => {
        const response1 = await request(app.callback()).get('/school/teacherid/9360ef49-47d7-489e-94e9-2867ad886678/students')
        const response2 = await request(app.callback()).get('/school/studentid/9360ef49-47d7-489e-94e9-2867ad886679/students')
        const response3 = await request(app.callback()).get('/school/subjectname/pyhsics/students')
        expect(response1.status).toBe(404)
        expect(response2.status).toBe(404)
        expect(response3.status).toBe(404)
    })

    test('get error id student data is not given properly', async () => {
        const data = {
            fname: 9,
            lname: "hofstaterd",
            dateofbirth: "11-4-2002"
        }
        const response = await request(app.callback()).post('/school/addstudent/students').send(data)
        expect(response.status).toBe(500)
    })

    test('get error if id is null or undefined', async () => {
        const response1 = await request(app.callback()).get('/school/teacherid/null/students')
        const response2 = await request(app.callback()).get('/school/studentid/null/students')
        const response3 = await request(app.callback()).get('/school/subjectname/null/students')
        expect(response1.status).toBe(400)
        expect(response2.status).toBe(400)
        expect(response3.status).toBe(400)
    })

    test('get error if  id is not uuid', async () => {
        const response1 = await request(app.callback()).get('/school/teacherid/9360ef49-47d7-489e-94e9/students')
        const response2 = await request(app.callback()).get('/school/studentid/9360ef49-47d7-489e-94e9/students')
        expect(response1.status).toBe(500)
        expect(response2.status).toBe(500)
    })


})