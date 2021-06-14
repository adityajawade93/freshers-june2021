

const request = require('supertest');

const server= require('./index.js');

beforeAll(async()=>{
     console.log('testing started');
})

afterAll(()=>{
    server.close();
    console.log('server closed');
})

describe('Post route', ()=>{
    test('should return status code 200', async ()=>{

        let todo={
            "title":"vegetables",
            "content": "tomato and potato",
            "completed": false
        }

        const response = await request(server).post('/todo').send(todo);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            "msg": "todo created"
        });
    });

    test('should return status code 404', async()=>{
        let todo={
            "content": "tomato and potato",
            "completed": false
        }

        const response = await request(server).post('/todo').send(todo);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            "msg":"title is missing"
        })
    })
})

describe('Get route',()=>{

    test('should return list of todo', async()=>{
        const response = await request(server).get("/todo");
        expect(response.status).toBe(200);
    })
   
})

