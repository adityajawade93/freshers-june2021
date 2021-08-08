import { app } from '../app/index'
import { setPath } from '../database/clientdb'
const request = require('supertest')

beforeAll(async () => {
   await setPath()
})

test('get sechdule given class id', async () => {
   const response = await request(app.callback()).get('/school/classid/f7999045-09f8-455d-a655-a529a29b36dd/sechdule')
   //console.log(response.body)
   expect(response.body.totalcount).toBe(4)
   expect(response.body.data[0].subjectname).toBe('biology')
   expect(response.body.data[1].subjectname).toBe('chemistry')
   expect(response.body.data[2].subjectname).toBe('maths')
   expect(response.body.data[3].subjectname).toBe('physics')
})
test('add sechdule', async () => {
   const data = {
      subjectname: "geology",
      teacher_id: "9360ef49-47d7-489e-94e9-2867ad886ff4",
      classid: "163d3f88-9926-403f-a10b-c79244c12599"
   }
   const response = await request(app.callback()).post('/school/addsechdule/sechdule').send(data)
   expect(response.status).toBe(200)
   expect(response.body).toStrictEqual({ "status": 200, "message": "sechdule created successfully" })
})

describe('errors', () => {
    
   test('get error when classid id is given wrong', async () => {
      const response = await request(app.callback()).get('/school/classid/f7999045-09f8-455d-a655/sechdule')
      expect(response.status).toBe(500)
   })

   test('get error whe the data is not given properly', async () => {
      const data = {
         subjectname: 9,
         teacher_id: 6,
         classid: 7
      }
      const response = await request(app.callback()).post('/school/addsechdule/sechdule').send(data)
      expect(response.status).toBe(500)
   })
})
