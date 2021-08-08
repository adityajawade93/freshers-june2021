import { app } from '../app/index'
import { setPath } from '../database/clientdb'
const request = require('supertest')

beforeAll(async () => {
    await setPath()
})

test('get students by class id', async () => {
    const response = await request(app.callback()).get('/school/student_classid/f7999045-09f8-455d-a655-a529a29b36dd/classes')
    console.log(response.body)
    expect(response.body.totalcount).toBe(2)
})
test('add student to class', async () => {
    const data = {
        cstudentid: "035f2158-e850-4427-90f8-832b8effdfd5",
        student_classid: "f7999045-09f8-455d-a655-a529a29b36dd",
    }
    const response = await request(app.callback()).post('/school/addstudentstoclass/classes').send(data)
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({ "status": 200, "message": "added students to class successfully" })
})
