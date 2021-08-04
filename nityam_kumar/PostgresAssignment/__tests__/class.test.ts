import request from "supertest";

import app from "../src/app/app";

import { pgConnect } from "../src/db/index";

import { pgDisConnect } from "../src/db/index";

describe("Class API", () => {
  beforeAll(async () => {
    await pgConnect();
  });
  afterAll(async () => await pgDisConnect());

  describe("Test Get/class", () => {
    test("it should respond with 200 success", async () => {
      const response = await request(app.callback()).get("/class").expect(200);
    });
    test("it should respond with 200 success", async () => {
      const response = await request(app.callback())
        .get("/class/scheduleSchool")
        .expect(200);
    });
    test("it should respond with 200 success", async () => {
      const classNumber = 9;
      const response = await request(app.callback())
        .get(`/class/schedule/${classNumber}`)
        .expect(200);
    });
    test("it should catch invalid class number input with 400 error", async () => {
      const classNumber = "1233";
      const response = await request(app.callback())
        .get(`/class/schedule/${classNumber}`)
        .expect(400);
    });
    test("it should respond with 200 success", async () => {
      const classNumber = 9;
      const response = await request(app.callback())
        .get(`/class/${classNumber}/student`)
        .expect(200);
    });

    test("it should catch invalid class number input with 400 error", async () => {
      const classNumber = "1233";
      const response = await request(app.callback())
        .get(`/class/${classNumber}/student`)
        .expect(400);
    });

    test("it should catch  class number input has no student with 404 error", async () => {
      const classNumber = 1;
      const response = await request(app.callback())
        .get(`/class/${classNumber}/student`)
        .expect(404);
    });
  });
});
