import request = require("supertest");
import app from "../app/index";
import { client as sqlclient } from "../database/db";

jest.setTimeout(15000);

describe("student routes tests", () => {
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
    // get students with pagination
    const page = 0;
    const size = 3;
    const res = await request(app).get(`/student?page=${page}&size=${size}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(size);
  });

  test("test case 2", async () => {
    // when one of the input is not a number
    const page = -2;
    const size = 3;
    console.log(typeof page , typeof size );
    const res = await request(app).get(`/student?page=${page}&size=${size}`);
    expect(res.status).toBe(404);
    expect(res.text).toBe("Not Found");
  });

  test("test case 3", async () => {
    // server error
    const data = {
      roll_num: 1186,
      fname: "Sailesh",
      lname: "Thakur",
      standard: 11,
      subcode: 901,
    };
    const res = await request(app).post("/createstudent").send(data);
    expect(res.status).toBe(500);
    expect(res.text).toBe("Server error");
  });  

  test("test case 4", async () => {
    // add student in the list
    const data = {
      roll_num: 1186,
      fname: "Sailesh",
      lname: "Thakur",
      standard: 11,
      subcode: 301,
    };
    const res = await request(app).post("/createstudent").send(data);
    expect(res.status).toBe(200);
    expect(res.text).toBe("data inserted into student table");
  });

  test("test case 5", async () => {
    //one of the input data is in incorrect format
    const data = {
      roll_num: "abcd",
      fname: "Tika",
      lname: "Singh",
      standard: 10,
      subcode: 201,
    };
    const res = await request(app).post("/createstudent").send(data);
    expect(res.status).toBe(422);
    expect(res.text).toBe("Please enter valid details");
  });
  test("test case 6", async () => {
    // undefined data
    const page = "abcd" ;
    const size = 3;
    const res = await request(app).get(`/student?page=${page}&size=${size}`);
    expect(res.status).toBe(400);
    expect(res.text).toBe("Bad Request");
  });
  
});
