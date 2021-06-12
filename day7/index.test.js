const app = require('./index.js')
const request = require('supertest')


test('get todo' , async () =>{

    const response = await request(app.callback()).get('/todo')
    expect(response.status).toBe(200)
})

test('get error msg with get todo by wrong id' , async () =>{

    const response = await request(app.callback()).get('/todo/kn45k3jbcis')
    expect(response.text).toBe('id is not given properly please give a proper id ')

})

test('created a todo task' , async () =>{
    const todo ={
        todotask:"watch netflix",
        completed:true
    }
    const response = await request(app.callback()).post('/todo').send(todo) 
    expect(response.status).toBe(200)
    expect(response.body.todotask).toBe(todo.todotask)
    expect(response.body.completed).toBe(true)
})




describe('update todo', () =>{

    let id

    test('post a todo task' , async () =>{

        const todo ={
            todotask: "do assignment",
            completed: true
        }
    
        const response = await request(app.callback()).post('/todo').send(todo)
        expect(response.status).toBe(200)
        id = response.body.id
    })

    
    
    test('update a todo task' , async () =>{

        const todo1 ={
            todotask: "did the assignment",
            completed: false
        }

        const response = await request(app.callback()).put('/todo/'+id).send(todo1)
        expect(response.body.todotask).toBe("did the assignment")
        expect(response.body.completed).toBe(false)
    })

    test('get error msg if id not given properly' , async () => {

        const response = await request(app.callback()).put('/todo/'+'jkhs87svhb').send({todotask:'watching movie',completed:true})
        expect(response.text).toBe("id is not given properly please give a proper id ")
    })

    test('get error msg if the todo task is empty' , async () =>{
        const response = await request(app.callback()).put('/todo/'+id).send({todotask:'',completed:true})
        expect(response.text).toBe("please give a proper task")
    })

    test('get error mdg if the task is not in the todo list', async () => {
        const response = await request(app.callback()).put('/todo/'+'bdhbjmgu9n4c74n').send({todotask:'watching movie',completed:true})
        expect(response.text).toBe("404,task not found")
    })

})

describe('delete a todo' , () =>{

    let id 

    test('post a todo task' , async () =>{

        const todo ={
            todotask: "play a game",
            completed: false
        }
    
        const response = await request(app.callback()).post('/todo').send(todo)
        expect(response.status).toBe(200)
        id = response.body.id
    })

    test('get error msg if id not given properly' , async () => {

        const response = await request(app.callback()).delete('/todo/'+'jkhs87svhb')
        expect(response.text).toBe("id is not given properly please give a proper id ")
    })

    test('get error mdg if the task is not in the todo list', async () => {
        const response = await request(app.callback()).delete('/todo/'+'bdhbjmgu9n4c74n')
        expect(response.text).toBe("404,task not found")
    })

    test('get success msg if task is deleted', async () => {
        const response = await request(app.callback()).delete('/todo/'+id)
        expect(response.text).toBe("task deleted successfully")
        expect(response.status).toBe(200)
    })

    


    
})