import request from "supertest";

import app from "../src/app/app";

import { pgConnect } from "../src/db/index";

import { pgDisConnect } from "../src/db/index";

describe("Student API", () => {
  beforeAll(async () => {
    await pgConnect();
  });
  afterAll(async () => await pgDisConnect());

  describe("Test Get/student", () => {
    test("it should respond with 200 success", async () => {
      const response = await request(app.callback())
        .get("/student/schedule/8d0rghc00kqqbz321")
        .expect(200)
        .expect("Content-Type", /json/);
    });

    test("it should catch invalid input with 400 failure", async () => {
      const invalidStudentId =
        "invalid-student-----------------------------------------------------------------------------";
      const response = await request(app.callback())
        .get(`/student/schedule/${invalidStudentId}`)
        .expect(400);
    });

    test("it should catch student id not found with 404 failure", async () => {
      const invalidStudentId = "invalid-student";
      const response = await request(app.callback())
        .get(`/student/schedule/${invalidStudentId}`)
        .expect(404);
    });

    test("it should respond with 200 success", async () => {
      const response = await request(app.callback())
        .get("/student?page=1&size=500")
        .expect(200)
        .expect("Content-Type", /json/);
    });

    test("it should catch invalid input with 400 failure", async () => {
      const response = await request(app.callback())
        .get("/student?page=1&size=502")
        .expect(400);
    });

    test("it should catch invalid input with 400 failure", async () => {
      const response = await request(app.callback())
        .get("/student?page=hi&size=500")
        .expect(400);
    });

    test("it should catch page not found with 404 failure", async () => {
      const response = await request(app.callback())
        .get("/student?page=50&size=500")
        .expect(404);
    });
  });

  const newStudent = {
    fname: "Rana",
    lname: "Aftab",
    age: 29,
    sex: "F",
    class_number: 12,
    dob: "12 January,1998",
  };

  const modifyStudent = {
    fname: "Ramu",
    lname: "mehtab",
    age: 49,
    class_number: 9,
    dob: "18 March,1996",
  };

  const newInvalidStudent = {
    fname: 58,
    lname: "Aftab",
    age: "29",
    sex: "FN",
  };
  let newStudentId: string;

  describe("Test Post/student", () => {
    test("it should respond with 201 success of successful creation", async () => {
      const response = await request(app.callback())
        .post("/student")
        .send(newStudent)
        .expect(201);

      newStudentId = response.body.student_id;
    });

    test("it should catch invalid input with 400 failure", async () => {
      const response = await request(app.callback())
        .post("/student")
        .send(newInvalidStudent)
        .expect(400);
    });
  });

  describe("Test Patch/student", () => {
    test("it should respond with 200 success of successful modification", async () => {
      const response = await request(app.callback())
        .patch(`/student/${newStudentId}`)
        .send(modifyStudent)
        .expect(200);

      expect(response.body.status).toBe(
        `successfully updated student with ${newStudentId}`
      );
    });

    test("it should catch invalid input with 400 failure", async () => {
      const response = await request(app.callback())
        .patch(`/student/${newStudentId}`)
        .send(newInvalidStudent)
        .expect(400);
    });

    test("it should catch student id not found with 404 failure", async () => {
      const invalidStudentId = "invalid-id";
      const response = await request(app.callback())
        .patch(`/student/${invalidStudentId}`)
        .send(modifyStudent)
        .expect(404);

      expect(response.body.status).toBe(
        `student with ${invalidStudentId} does not exist`
      );
    });
  });
});
