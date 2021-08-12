import { app } from '../app/index'
import { setPath } from '../database/clientdb'
const request = require('supertest')

beforeAll(async () => {
   await setPath()
})

test('get subjects', async () => {
   const response = await request(app.callback()).get('/school/subjects')
   //console.log(response.body)
   expect(response.body.totalcount).toBe(5)
   expect(response.body.data[0].subname).toBe('physics')
   expect(response.body.data[1].subname).toBe('chemistry')
   expect(response.body.data[2].subname).toBe('biology')
   expect(response.body.data[3].subname).toBe('maths')
   expect(response.body.data[4].subname).toBe('geology')
})
test('add subjects', async () => {
   const data = {
      subname: "palentology"
   }
   const response = await request(app.callback()).post('/school/addsubject/subjects').send(data)
   expect(response.status).toBe(200)
   expect(response.body).toStrictEqual({ "status": 200, "message": "subject is successfully added" })
})

describe('errors', () => {
   test('get error if subject is not a string', async () => {
      const data = {
         subname: 7
      }
      const response = await request(app.callback()).post('/school/addsubject/subjects').send(data)
      expect(response.status).toBe(500)
   })
})
