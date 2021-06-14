const request = require('supertest');
const app = require('./todokoa');



test('Get test with some id', async () => {
    const res = await request(app.callback()).get('/todo/14x2wt2wvkpw4zbl8');
    expect(res.body).toEqual({
        "id": "14x2wt2wvkpw4zbl8",
        "date": "2021-06-14T04:48:44.395Z",
        "info": "Assingment0",
        "completed": true
    });
  });
  
