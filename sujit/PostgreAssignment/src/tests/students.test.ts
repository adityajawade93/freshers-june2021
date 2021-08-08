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

    test('get error if teacher id is wrong', async () => {
        const response = await request(app.callback()).get('/school/teacherid/9360ef49-47d7-489e-94e9-2867ad886678/students')
        expect(response.status).toBe(404)
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

})