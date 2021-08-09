import request = require("supertest");
import app from "../app/index";
import { client as sqlclient } from "../database/db";

describe("subject routes tests", () => {
  beforeAll(async () => {
    sqlclient.connect().then(() => {
      console.log("database connected successfully");
    });
  });

  afterAll(async () => {
    sqlclient.end();
    console.log("database disconnected successfully");
    app.close();
  });

  test('test case 1', async () => { //getting all classes
    const res = await request(app).get('/class');
    expect(res.status).toBe(200);
  }); 

  test('test case 2', async () => { // request with wrong url
    const res = await request(app).get('/cass');
    expect(res.status).toBe(404);
    expect(res.text).toBe('Not Found');

  }); 

  test('test case 3', async () => { // get students in perticular class
    const res = await request(app).get('/class/11');
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("roll_num");
    expect(res.body[0]).toHaveProperty("fname");
    expect(res.body[0]).toHaveProperty("lname");
    expect(res.body[0]).toHaveProperty("standard");
  
  });

  
  test('test case 4', async () => { // invalid input format
    const res = await request(app).get('/class/ab');
    expect(res.status).toBe(422);
    expect(res.text).toBe("Please enter valid details");
    
  });

  test('test case 5', async () => { // request with wrong url
    const res = await request(app).get('/cass/10');
    expect(res.status).toBe(404);
    expect(res.text).toBe("Not Found");
    
  });

});
