import request from "supertest";

import app from "../src/app/app";

import { pgConnect } from "../src/db/index";

import { pgDisConnect } from "../src/db/index";

describe("Marks API", () => {
  beforeAll(async () => {
    await pgConnect();
  });
  afterAll(async () => await pgDisConnect());

  describe("Test Get/mark", () => {
    test("it should respond with 200 success", async () => {
      const studentId = "123458";
      const response = await request(app.callback())
        .get(`/marks/student/${studentId}`)
        .expect(200);
    });

    test("it should catch invalid input with 400 failure", async () => {
      const studentId =
        "ivalid-input------------------------------------------------------------------------------------";
      const response = await request(app.callback())
        .get(`/marks/student/${studentId}`)
        .expect(400);
    });

    test("it should catch student id not found with 404 failure", async () => {
      const studentId = "*****";
      const response = await request(app.callback())
        .get(`/marks/student/${studentId}`)
        .expect(404);
    });

    test("it should respond with 200 success", async () => {
      const response = await request(app.callback())
        .get(`/marks/topscore/subject`)
        .expect(200);
    });

    test("it should respond with 200 success", async () => {
      const subjectId = "105064";
      const response = await request(app.callback())
        .get(`/marks/topscore/subject/${subjectId}`)
        .expect(200);
    });

    test("it should catch invalid input with 400 failure", async () => {
      const subjectId =
        "invalid-subject-id---------------------------------------------------------------------------------------";
      const response = await request(app.callback())
        .get(`/marks/topscore/subject/${subjectId}`)
        .expect(400);
    });

    test("it should respond with 200 success", async () => {
      const number = 8;
      const response = await request(app.callback())
        .get(`/marks/topscoreSchool/${number}`)
        .expect(200);
    });

    test("it should catch invalid input with 400 failure", async () => {
      const number = -1;
      const response = await request(app.callback())
        .get(`/marks/topscoreSchool/${number}`)
        .expect(400);
    });

    test("it should respond with 200 success", async () => {
      const response = await request(app.callback())
        .get(`/marks/topscore/class`)
        .expect(200);
    });

    test("it should respond with 200 success", async () => {
      const classNumber = 11;
      const response = await request(app.callback())
        .get(`/marks/topscore/class/${classNumber}`)
        .expect(200);
    });

    test("it should catch invalid input with 400 failure", async () => {
      const classNumber = 15;
      const response = await request(app.callback())
        .get(`/marks/topscore/class/${classNumber}`)
        .expect(400);
    });
  });

  const newMarks = {
    student_id: "123459",
    subject_id: "8d0rgh9s0kqm8noho",
    marks: 67,
    teacher_id: "8d0rgh12ckqm32rcj",
    class_number: 11,
  };
  const modifyMarks = {
    marks: 35,
  };
  const newMarksWithInvalidInput = {
    student_id: "2112222",
    subject_id: "2121",
    marks: 102,
    teacher_id: "1212",
    class_number: -1,
  };
  const newMarksWithInvalidStudentId = {
    student_id: "******",
    subject_id: "105062",
    marks: 89,
    teacher_id: "333333",
    class_number: 11,
  };
  const newSubjectWithInvalidSubjectId = {
    student_id: "123457",
    subject_id: "*****",
    marks: 89,
    teacher_id: "333333",
    class_number: 11,
  };

  const alreadyPresentMarks = {
    student_id: "123457",
    subject_id: "105061",
    marks: 32,
    teacher_id: "222222",
    class_number: 11,
  };

  describe("Test POST/Marks", () => {
    test("it should respond with 201 success of successful creation", async () => {
      const response = await request(app.callback())
        .post("/marks")
        .send(newMarks)
        .expect(201);
      expect(response.body.status).toBe(
        `successfully created marks with ${newMarks.student_id} & ${newMarks.subject_id}`
      );
    });
    test("it should catch invalid input with 400 error", async () => {
      const response = await request(app.callback())
        .post("/marks")
        .send(newMarksWithInvalidInput)
        .expect(400);
    });

    test("it should catch invalid input student id not found with 401 error", async () => {
      const response = await request(app.callback())
        .post("/marks")
        .send(newMarksWithInvalidStudentId)
        .expect(401);

      expect(response.body.status).toBe(
        `student with this id not available!! Enter valid student id`
      );
    });

    test("it should catch invalid input subject id not found with 401 error", async () => {
      const response = await request(app.callback())
        .post("/marks")
        .send(newSubjectWithInvalidSubjectId)
        .expect(401);

      expect(response.body.status).toBe(
        `subject with this class not available!! Enter valid Details`
      );
    });

    test("it should catch invalid input subject already present in class with 409 error", async () => {
      const response = await request(app.callback())
        .post("/marks")
        .send(alreadyPresentMarks)
        .expect(409);

      expect(response.body.status).toBe(`data already available `);
    });
  });

  describe("Test Patch/Marks", () => {
    test("it should respond with 200 success of successful modification", async () => {
      const response = await request(app.callback())
        .patch(`/marks/${newMarks.student_id}/${newMarks.subject_id}`)
        .send(modifyMarks)
        .expect(200);

      expect(response.body.status).toBe(
        `successfully updated marks with ${newMarks.student_id} & ${newMarks.subject_id} with ${modifyMarks.marks}`
      );
    });

    test("it should catch invalid input with 400 failure", async () => {
      const response = await request(app.callback())
        .patch(`/marks/${newMarks.student_id}/${newMarks.subject_id}`)
        .send({
          marks: 105,
        })
        .expect(400);
    });

    test("it should catch invalid input student or subject id dos not exist with 401 failure", async () => {
      const studentId = "*invalid-id*";
      const subjectId = "**invalid-id";
      const response = await request(app.callback())
        .patch(`/marks/${studentId}/${subjectId}`)
        .send(modifyMarks)
        .expect(401);

      expect(response.body.status).toBe(
        `either subject or student id not available`
      );
    });
  });
});
