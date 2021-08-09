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
    // get subject list
    const res = await request(app).get("/subject");
    expect(res.status).toBe(200);
  });
  test("test case 2", async () => {
    // subject list with wrong url
    const res = await request(app).get("/subjectdd");
    expect(res.status).toBe(404);
  });

  test("test case 3", async () => {
    // get the list of student under particular subject
    const subjectId = 201;
    const res = await request(app).get(`/subject/${subjectId}`);
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("roll_num");
    expect(res.body[0]).toHaveProperty("fname");
    expect(res.body[0]).toHaveProperty("lname");
    expect(res.body[0]).toHaveProperty("standard");
  });

  test("test case 4", async () => {
    // get list with wrong sub id
    const subjectId = "ab";
    const res = await request(app).get(`/subject/${subjectId}`);
    expect(res.status).toBe(422);
    expect(res.text).toBe("Please enter valid details");
  });

  test("test case 5", async () => {
    // get all subject marks obained by particular student rull num
    const studentId = 1001;
    const res = await request(app).get(`/marks/${studentId}`);
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("subcode");
    expect(res.body[0]).toHaveProperty("subject");
    expect(res.body[0]).toHaveProperty("marks");
  });

  test("test case 6", async () => {
    // get all subject marks obained by particular student with wrong roll num
    const studentId = "abcd";
    const res = await request(app).get(`/marks/${studentId}`);
    expect(res.status).toBe(422);
    expect(res.text).toBe("Please enter valid details");
  });

  test("test case 7", async () => {
    // add aubject
    const data = {
      subcode: 701,
      subject: "History",
      staffid: 55,
    };
    const res = await request(app).post("/createsubject").send(data);
    expect(res.status).toBe(200);
    expect(res.text).toBe("data inserted into Subject table");
  });

  test("test case 8", async () => {
    // subcode is wrong
    const data = {
      subcode: "ABC",
      subject: "History",
    };
    const res = await request(app).post("/createsubject").send(data);
    expect(res.status).toBe(422);
    expect(res.text).toBe("Please enter valid details");
  });
});
