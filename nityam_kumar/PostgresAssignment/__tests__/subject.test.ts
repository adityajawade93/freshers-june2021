import request from "supertest";

import app from "../src/app/app";

import { pgConnect } from "../src/db/index";

import { pgDisConnect } from "../src/db/index";

describe("Subject API", () => {
  beforeAll(async () => {
    await pgConnect();
  });
  afterAll(async () => await pgDisConnect());

  describe("Test Get/Class", () => {
    test("it should respond with 200 success", async () => {
      const response = await request(app.callback())
        .get("/subject")
        .expect(200);
    });

    test("it should respond with 200 success", async () => {
      const subjectId = "105062";
      const response = await request(app.callback())
        .get(`/subject/students/${subjectId}`)
        .expect(200)
        .expect("Content-Type", /json/);
    });
    test("it should catch invalid input of subject id with 400 failure", async () => {
      const subjectId =
        "11111111111111111111111111111111111111111111111111111111111222222222222222222222233333333333333333333333344444444444444444444444";

      const response = await request(app.callback())
        .get(`/subject/students/${subjectId}`)
        .expect(400);
    });

    test("it should catch invalid input id not found  with 404 failure", async () => {
      const subjectId = "*";
      const response = await request(app.callback())
        .get(`/subject/students/${subjectId}`)
        .expect(404);
    });
  });

  describe("Test POST/Subject", () => {
    const newSubject = {
      subject_name: "quantum Physics",
      teacher_id: "8d0rghfq8krx97qbl",
      class_number: 9,
    };
    const newSubjectWithInvalidInput = {
      subject_name: "B",
      teacher_id: "333333",
      class_number: 15,
    };
    const newSubjectWithInvalidTeacherId = {
      subject_name: "Biology",
      teacher_id: "*********",
      class_number: 11,
    };
    const alreadyPresentSubject = {
      subject_name: "information",
      teacher_id: "111111",
      class_number: 11,
    };
    test("it should respond with 201 success of successful creation", async () => {
      const response = await request(app.callback())
        .post("/subject")
        .send(newSubject)
        .expect(201);
    });
    test("it should catch invalid input with 400 error", async () => {
      const response = await request(app.callback())
        .post("/subject")
        .send(newSubjectWithInvalidInput)
        .expect(400);
    });

    test("it should catch invalid input teacher id not found with 401 error", async () => {
      const response = await request(app.callback())
        .post("/subject")
        .send(newSubjectWithInvalidTeacherId)
        .expect(401);

      expect(response.body.status).toBe(
        "Teacher with this id not available!! Enter valid teacher id"
      );
    });

    test("it should catch invalid input subject already present in class with 409 error", async () => {
      const response = await request(app.callback())
        .post("/subject")
        .send(alreadyPresentSubject)
        .expect(409);

      expect(response.body.status).toBe("subject already exist in this class");
    });
  });
});
