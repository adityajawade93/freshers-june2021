const app = require('./todo_koa');
const request = require('supertest');

test('get complete task list', async () => {

    const response = await request(app.callback()).get('/todo');
    expect(response.status).toBe(200);
})

describe('POST /todo/', () =>{
    test('should get error if one or more details are not in correct format ', async () => {
        const response = await request(app.callback()).post('/todo/').send({ id:'12', title: 'watch movie', status: true });
        expect(response.text).toBe("Please enter values in correct format");
    })

    test('post a task with correct details ', async () => {
        const response = await request(app.callback()).post('/todo/').send({ id:14 , title: 'watch movie', status: true });
        expect(response.status).toBe(200);
        expect(response.text).toBe('task added');
    })

})

describe('PUT /todo/', () => {

    test('post a task', async () => {

        const todo = {
            id:35,
            title: "watch movie",
            status: false
        }

        const response = await request(app.callback()).post('/todo/').send(todo);
        expect(response.status).toBe(200);
    })



    test('update the task with given id', async () => {
        const todo = {
            title: "watch movie",
            status: true
        }

        const response = await request(app.callback()).put('/todo/' + '35').send(todo);
        expect(response.text).toBe('task updated');
    })

    test('should get error if no task is present with given id', async () => {
        const response = await request(app.callback()).put('/todo/' + '40').send({ title: 'watch movie', status: true })
        expect(response.text).toBe("No task is present with given id");
    })

    test('should get error if required details are empty', async () => {
        const response = await request(app.callback()).put('/todo/' + '35').send({ title: '', status: true })
        expect(response.text).toBe("please give all required values");
    })

    test('should get error if one or more details are not in correct format ', async () => {
        const response = await request(app.callback()).put('/todo/' + '35').send({ title: 'watch movie', status: 'yes' })
        expect(response.text).toBe("Please enter values in correct format");
    })

})

describe('DELETE /todo/' , () =>{

    test('post a task' , async () =>{

        const task ={
            id:45,
            title: "buy mobile",
            status: false
        }
    
        const response = await request(app.callback()).post('/todo/').send(task);
        expect(response.status).toBe(200);
    })

    test('should get error if id is not in correct format' , async () => {

        const response = await request(app.callback()).delete('/todo/'+'356745');
        expect(response.text).toBe("Please check your id");
    })

    test('should get error if no task is present with given id', async () => {
        const response = await request(app.callback()).delete('/todo/'+'41');
        expect(response.text).toBe("No task is present with given id");
    })

    test('delete the task with given id', async () => {
        const response = await request(app.callback()).delete('/todo/'+'45');
        expect(response.text).toBe("task deleted");
        expect(response.status).toBe(200);
    })  
})