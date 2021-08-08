import { app } from '../app/index'
import { setPath } from '../database/clientdb'
const request = require('supertest')

beforeAll(async () => {
    await setPath()
})

test('get students marks by id ', async () => {
    const response = await request(app.callback()).get('/school/studentid/56a6af4a-b323-450e-aaa0-04cfdab6fa59/marks')
    expect(response.body.totalcount).toBe(3)
    expect(response.status).toBe(200)
})
test('get highest marks given subject id and class id', async () => {
    const response = await request(app.callback()).get(`/school/highestmarks/marks?subject_id=c85f2e2d-4fd0-4309-8c62-8990c350d4fc&student_class_id=f7999045-09f8-455d-a655-a529a29b36dd`)
    //console.log(response.body)
    expect(response.body.totalcount).toBe(1)
    expect(response.status).toBe(200)
    expect(response.body.data[0].fname).toBe('john')
    expect(response.body.data[0].rmarks).toBe(96)

})
test('top ten in class given class id', async () => {
    const response = await request(app.callback()).get('/school/topten/f7999045-09f8-455d-a655-a529a29b36dd/marks')
    expect(response.body.totalcount).toBe(2)
    expect(response.status).toBe(200)
    expect(response.body.data[0].sum).toBe('288')
    expect(response.body.data[1].sum).toBe('284')

})
test('update marks', async () => {
    const data = {
        rstudent_id: "56a6af4a-b323-450e-aaa0-04cfdab6fa59",
        rstudent_class_id: "f7999045-09f8-455d-a655-a529a29b36dd",
        rsubject_id: "c85f2e2d-4fd0-4309-8c62-8990c350d4fc",
        rmarks: 91
    }
    const response = await request(app.callback()).put('/school/updateMarks/marks').send(data)
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({ "status": 200, "message": "marks updated successfully" })
})

test('add marks', async () => {
    const data = {
        rstudent_id: "56a6af4a-b323-450e-aaa0-04cfdab6fa59",
        rstudent_class_id: "f7999045-09f8-455d-a655-a529a29b36dd",
        rsubject_id: "c85f2e2d-4fd0-4309-8c62-8990c350d4fc",
        rmarks: 91
    }
    const response = await request(app.callback()).post('/school/addmarks/marks').send(data)
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual({ "status": 200, "message": "marks uploaded successfully" })
})


describe('errors', () => {
    test('get error when id is wrong ', async () => {
        const response = await request(app.callback()).get('/school/studentid/56a6af4a-b323-450e-aaa0-04cfdab6fa58/marks')
        expect(response.status).toBe(404)
    })

    test('get error for highest marks with subject id and class id not given', async () => {
        const response = await request(app.callback()).get(`/school/highestmarks/marks?subject_id=8990c350d4fc&student_class_id=a529a29b36dd`)
        console.log(response.body)
        expect(response.status).toBe(500)
    })    
})