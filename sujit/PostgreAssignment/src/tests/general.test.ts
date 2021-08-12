import { app } from '../app/index'
import { setPath } from '../database/clientdb'
const request = require('supertest')

beforeAll(async () => {
    await setPath()
})

test('get error if url is not found', async () => {
    const response = await request(app.callback()).get('/school/student_classid/')
    expect(response.status).toBe(404)
})