import request = require("supertest");
import app from "../app/index";
import { client as sqlclient } from "../database/db";

jest.setTimeout(15000);

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

  test("test case 1", async () => {
    // non existent subcode entered
    const data = {
      resultsid: 345,
      roll_num: 1186,
      subcode: 5467,
      staffid: 15,
      standard: 11,
      marks: 66,
    };
    const res = await request(app).post("/createresult").send(data);
    expect(res.status).toBe(500);
    expect(res.text).toBe("Server error");
  });

  test("test case 2", async () => {
    // add result of the student
    const data = {
      resultsid: 345,
      roll_num: 1186,
      subcode: 301,
      staffid: 15,
      standard: 11,
      marks: 66,
    };
    const res = await request(app).post("/createresult").send(data);
    expect(res.status).toBe(200);
    expect(res.text).toBe("data inserted into Marks table");
  });

  test("test case 3", async () => {
    // invalid input format
    const data = {
      resultsid: 345,
      roll_num: 1186,
      subcode: "abcd",
      staffid: 15,
      standard: 11,
      marks: 66,
    };
    const res = await request(app).post("/createresult").send(data);
    expect(res.status).toBe(422);
    expect(res.text).toBe("Please enter valid details");
  });

  test("test case 4", async () => {
    //  subject must be opted by student
    const data = {
      roll_num: 1186,
      subcode: 101,
      marks: 23,
    };
    const res = await request(app).put("/result").send(data);
    expect(res.status).toBe(400);
  
  });
  test("test case 5", async () => {
    //  invalid input format for updating marks
    const data = {
      roll_num: "abcd",
      subcode: 101,
      marks: 87,
    };
    const res = await request(app).put("/result").send(data);
    expect(res.status).toBe(422);
    expect(res.text).toBe("Please enter valid details");
  });

  test("test case 6", async () => {
    //  updating marks
    const data = {
      roll_num: 1021,
      subcode: 201,
      marks: 87,
    };
    const res = await request(app).put("/result").send(data);
    expect(res.status).toBe(200);
    expect(res.text).toBe("marks updated in Marks table");
  });

  test("test case 7", async () => {
    //  wrong subcode entered
    const data = {
      roll_num: 1021,
      subcode: 301,
      marks: 87,
    };
    const res = await request(app).put("/result").send(data);
    expect(res.status).toBe(400);
    expect(res.text).toBe("This subject is not opted by the student");
  });

  test("test case 8", async () => {
    //  updating marks with non existent roll num
    const data = {
      roll_num: 111111,
      subcode: 201,
      marks: 87,
    };
    const res = await request(app).put("/result").send(data);
    expect(res.status).toBe(500);
    expect(res.text).toBe("Server error");
  });
});
