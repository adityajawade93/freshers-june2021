import { app } from '../app/index'
import { setPath } from '../database/clientdb'
const request = require('supertest')

beforeAll(async () => {
   await setPath()
})

test('get all standards', async () => {
   const response = await request(app.callback()).get('/school/standards')
   console.log(response.body)
   expect(response.body.totalcount).toBe(3)
   expect(response.body.data[0].class_level).toBe(10)
   expect(response.body.data[1].class_level).toBe(11)
   expect(response.body.data[2].class_level).toBe(12)
})
test('', async () => {
   const data = {
      class_level: 9
   }
   const response = await request(app.callback()).post('/school/addstandards/standards').send(data)
   expect(response.status).toBe(200)
   expect(response.body).toStrictEqual({ "status": 200, "message": "class is successfully added" })
})

