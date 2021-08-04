import request from "supertest";

import app from "../src/app/app";

import { pgConnect } from "../src/db/index";

import { pgDisConnect } from "../src/db/index";

describe("Teacher API", () => {
  beforeAll(async () => {
    await pgConnect();
  });
  afterAll(async () => await pgDisConnect());

  describe("Test Get/teacher", () => {
    test("it should respond with 200 success", async () => {
      const response = await request(app.callback())
        .get("/teacher?page=1&size=500")
        .expect(200);
    });

    test("it should catch invalid input with 400 failure", async () => {
      const response = await request(app.callback())
        .get("/teacher?page=1&size=502")
        .expect(400);
    });

    test("it should catch invalid input with 400 failure", async () => {
      const response = await request(app.callback())
        .get("/teacher?page=hi&size=500")
        .expect(400);
    });

    test("it should catch page not found with 404 failure", async () => {
      const response = await request(app.callback())
        .get("/teacher?page=50&size=500")
        .expect(404);
    });

    test("it should respond with 200 success", async () => {
      const response = await request(app.callback())
        .get("/teacher/teaching?page=1&size=500")
        .expect(200);
    });

    test("it should catch invalid input with 400 failure", async () => {
      const response = await request(app.callback())
        .get("/teacher/teaching?page=1&size=502")
        .expect(400);
    });

    test("it should catch invalid input with 400 failure", async () => {
      const response = await request(app.callback())
        .get("/teacher/teaching?page=hi&size=500")
        .expect(400);
    });

    test("it should catch page not found with 404 failure", async () => {
      const response = await request(app.callback())
        .get("/teacher/teaching?page=50&size=500")
        .expect(404);
    });

    test("it should respond with 200 success", async () => {
      const teacherId = "111111";
      const response = await request(app.callback())
        .get(`/teacher/students/${teacherId}`)
        .expect(200);
    });

    test("it should catch invalid input with 400 failure", async () => {
      const teacherId =
        "****************************************************************************************";
      const response = await request(app.callback())
        .get(`/teacher/students/${teacherId}`)
        .expect(400);
    });

    test("it should catch teacher id not found with  404 failure", async () => {
      const teacherId = "********";
      const response = await request(app.callback())
        .get(`/teacher/students/${teacherId}`)
        .expect(404);
    });

    const newTeacher = {
      fname: "Ranaa",
      lname: "Aftabb",
      age: 29,
      sex: "F",
      dob: "12 January,1998",
    };

    const modifyTeacher = {
      fname: "Ramu",
      lname: "mehtab",
      age: 49,
      dob: "18 March,1996",
    };

    const newInvalidTeacher = {
      fname: 58,
      lname: "Aftab",
      age: "29",
      sex: "FN",
      dob: "hello",
    };
    let newTeacherId: string;

    describe("Test Post/teacher", () => {
      test("it should respond with 201 success of successful creation", async () => {
        const response = await request(app.callback())
          .post("/teacher")
          .send(newTeacher)
          .expect(201);

        newTeacherId = response.body.teacher_id;
        console.log(newTeacherId);
      });

      test("it should catch invalid input with 400 failure", async () => {
        const response = await request(app.callback())
          .post("/teacher")
          .send(newInvalidTeacher)
          .expect(400);
      });
    });

    describe("Test Patch/teacher", () => {
      test("it should respond with 200 success of successful modification", async () => {
        const response = await request(app.callback())
          .patch(`/teacher/${newTeacherId}`)
          .send(modifyTeacher)
          .expect(200);

        expect(response.body.status).toBe(
          `successfully updated teacher with ${newTeacherId}`
        );
      });

      test("it should catch invalid input with 400 failure", async () => {
        const response = await request(app.callback())
          .patch(`/teacher/${newTeacherId}`)
          .send(newInvalidTeacher)
          .expect(400);
      });

      test("it should catch teacher id not found with 404 failure", async () => {
        const invalidTeacherId = "invalid-id";
        const response = await request(app.callback())
          .patch(`/teacher/${invalidTeacherId}`)
          .send(modifyTeacher)
          .expect(404);

        expect(response.body.status).toBe(
          `teacher with ${invalidTeacherId} does not exist`
        );
      });
    });
  });
});
