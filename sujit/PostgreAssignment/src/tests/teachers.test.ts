import { app } from '../app/index'
import { Iteacher } from '../controller/teachers'
import { setPath } from '../database/clientdb'
const request = require('supertest')

beforeAll(async () => {
   await setPath()
})

test('get teacher by id', async () => {
   const response = await request(app.callback()).get('/school/teacherid/9360ef49-47d7-489e-94e9-2867ad886ff4/teachers')
   console.log(response.body)
   expect(response.status).toBe(200)
   expect(response.body.totalcount).toBe(1)
   expect(response.body.data[0].tfname).toBe('chandler')
})

test('get teachers', async () => {
   const response = await request(app.callback()).get('/school/teachers')
   console.log(response.body)
   expect(response.status).toBe(200)
   expect(response.body.totalcount).toBe(4)
})

test('add teacher', async () => {
   const data = {
      tfname: "ross",
      tlname: "geller",
      tsubject_id: "c85f2e2d-4fd0-4309-8c62-8990c350d4fc",
      joindate: "10-11-2003"
   }
   const response = await request(app.callback()).post('/school/addteacher/teachers').send(data)
   expect(response.status).toBe(200)
   expect(response.body).toStrictEqual({ "status": 200, "message": "teacher is successfully added" })
})
