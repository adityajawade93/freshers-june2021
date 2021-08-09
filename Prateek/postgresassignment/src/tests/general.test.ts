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

  test('test case 1', async () => { // getting topper in particular subject and class 
    const res = await request(app).get('/topclass/10/topsubject/201');
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty('roll_num');
    expect(res.body[0]).toHaveProperty('fname');
    expect(res.body[0]).toHaveProperty('marks');
  });

  test('test case 2', async () => { // putting invalid class or subject id
    const res = await request(app).get('/topclass/abc/topsubject/"ab"');
    expect(res.status).toBe(422);
    expect(res.text).toBe('Please enter valid details');
  
  });

  test('test case 3', async () => { // wrong url
    const res = await request(app).get('/class/10/subject/201');
    expect(res.status).toBe(404);
    expect(res.text).toBe('Not Found');
  
  });

});
