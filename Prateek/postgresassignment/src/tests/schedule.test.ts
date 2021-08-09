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

  test("test case 1", async () => {
    // add schedule
    const data = {
      uniclassid: "9C5",
      Standard: 9,
      classno: 5,
      subcode: 701,
      subject: "History",
      staffid: 55,
      T_fname: "Vishal",
    };
    const res = await request(app).post("/createclass_schedule").send(data);
    expect(res.status).toBe(200);
    expect(res.text).toBe("data inserted into Class_schedule table");
  });
  test("test case 2", async () => {
    // invalid input format
    const data = {
      uniclassid: "9C5",
      Standard: 9,
      classno: "abcd",
      subcode: 701,
      subject: "History",
      staffid: 55,
      T_fname: "Vishal",
    };
    const res = await request(app).post("/createclass_schedule").send(data);
    expect(res.status).toBe(422);
    expect(res.text).toBe("Please enter valid details");
  });
});
