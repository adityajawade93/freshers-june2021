// JavaScript source code

const app = require('./index.js')
const request = require('supertest')

test('get todo', async () => {

    const response = await request(app.callback()).get('/todo')
    expect(response.status).toBe(200)
})

test('creating a work', async () => {
    const todo = {
        todowork: "play video games",
        status: true
    }
    const response = await request(app.callback()).post('/todo').send(todo)
    expect(response.status).toBe(200)
    expect(response.body.todowork).toBe(todo.todowork)
    expect(response.body.status).toBe(true)
})

test('when wrong id is pushed', async () => {

    const response = await request(app.callback()).get('/todo/ungabunga')
    expect(response.text).toBe('error in assigning id')

})


describe('update todo', () => {

    let id

    test('posting a work', async () => {

        const todo = {
            todowork: "do the assignment",
            status: true
        }

        const response = await request(app.callback()).post('/todo').send(todo)
        expect(response.status).toBe(200)
        id = response.body.id
    })


    test('throw error if work is empty', async () => {
        const response = await request(app.callback()).put('/todo/' + id).send({ todowork: '', status: true })
        expect(response.text).toBe("error in assigning id")
    })


    test('throw error if wrong id', async () => {

        const response = await request(app.callback()).put('/todo/' + 'ungabunga').send({ todowork: 'play video games', status: true })
        expect(response.text).toBe("error in assigning id")
    })

 
    test('throw error if work is not in todo list', async () => {
        const response = await request(app.callback()).put('/todo/' + 'ggeehehehe').send({ todowork: 'play video games', status: true })
        expect(response.text).toBe("error in assigning id")
    })

})

describe('delete a work', () => {

    let id

    test('post a work', async () => {

        const todo = {
            todowork: "play a game",
            status: false
        }

        const response = await request(app.callback()).post('/todo').send(todo)
        expect(response.status).toBe(200)
        id = response.body.id
    })



    test('should throw throw error', async () => {

        const response = await request(app.callback()).delete('/todo/' + 'jkkjhs87b')
        expect(response.text).toBe("error in assigning id")
    })

    test('should throw error ', async () => {
        const response = await request(app.callback()).delete('/todo/' + 'Ungabungakalingavingachinga')
        expect(response.text).toBe("error in assigning id")
    })

   
})