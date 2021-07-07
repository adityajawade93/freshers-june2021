const server = require('./index');
const request = require('supertest');

var id;


beforeAll(()=>{

     console.log("Jest is starting now !!! be prepared");

})


afterAll(()=>{
    
    server.close();
    console.log("Testing is finished !! hope your code run well");
})

describe('POST/ todo app ',()=>{

    test('Should return 200 status code',async()=>{

        let obj = {
          "title" : "notes",
          "content" : "himanshu" 
        }
       const response = await request(server).post('/todo').send(obj);
       expect(response.status).toBe(200);
       expect(response.body).toEqual({
           "msg" : "Notes Created"
       })
    
       })


       test('Should return 404 status code',async()=>{

        let obj = {
          "content" : "himanshu" 
        }
       const response = await request(server).post('/todo').send(obj);
       expect(response.status).toBe(404);
       expect(response.body).toEqual({
           "msg" :  "Title is missing"
       })
    
       })

});

describe('GET / todo app ',()=>{

    test('Should return list of todo',async()=>{

        
       const response = await request(server).get('/todo');
       expect(response.status).toBe(200);
       id = response.body[0].id;
       console.log(id);
    
       })



});


describe('Update / todo app ',()=>{

    test('Should return 200 code',async()=>{

        
       const response = await request(server).put('/todo/'+id);
       expect(response.status).toBe(200);
       expect(response.body).toEqual(
           {
               "msg": "Notes Updated"
           }
       )



})
});

describe('DELETE / todo app ',()=>{

    test('Should return message as notes deleted',async()=>{

        
       const response = await request(server).delete('/todo/'+id);
       expect(response.status).toBe(200);
       expect(response.body).toEqual({
           "msg" : "Notes deleted"
       })
    
       })
       test('Should return message as notes not found',async()=>{

        
        const response = await request(server).delete('/todo/'+id);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            "msg" : "Notes not Found"
        })
     
        })




});

