import request = require("supertest");
import app from "../app/index";
import { client as sqlclient } from "../database/db";

jest.setTimeout(15000);

describe("teacher routes tests", () => {
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
    // get teacher list
    const res = await request(app).get("/teacher");
    expect(res.status).toBe(200);
  });

  test("test case 2", async () => {
    // get the list of student under particular teacher
    const teacherId = 15;
    const res = await request(app).get(`/teacher/${teacherId}`);
    expect(res.status).toBe(200);
  });

  test("test case 3", async () => {
    // when the input format is incorrect
    const teacherId = "ab";
    const res = await request(app).get(`/teacher/${teacherId}`);
    expect(res.status).toBe(422);
    expect(res.text).toBe("Please enter valid details");
  });

  test("test case 4", async () => {
    // server error
    const data = {
      staffid: 105,
      fname: "Vishal",
      lname: "Deka",
      subcode: 901,
    };
    const res = await request(app).post("/createteacher").send(data);
    expect(res.status).toBe(500);
    expect(res.text).toBe("Server error");
  });

  test("test case 5", async () => {
    // add teacher
    const data = {
      staffid: 55,
      fname: "Vishal",
      lname: "Deka",
      subcode: 701,
    };
    const res = await request(app).post("/createteacher").send(data);
    expect(res.status).toBe(200);
    expect(res.text).toBe("data inserted into teacher table");
  });

  test("test case 6", async () => {
    // add teacher but with already present id
    const data = {
      staffid: 55,
      fname: "Vishal",
      lname: "Deka",
      subcode: 701,
    };
    const res = await request(app).post("/createteacher").send(data);
    expect(res.status).toBe(500);
  });

  test("test case 7", async () => {
    // when input is in wrong format
    const data = {
      staffid: "abcd",
      fname: "Vishal",
      lname: "Deka",
      subcode: 701,
    };
    const res = await request(app).post("/createteacher").send(data);
    expect(res.status).toBe(422);
    expect(res.text).toBe("Please enter valid details");
  });
});
