import request from "supertest";
import { Test } from "../../src/app/server";

// student
describe("GET /student", () => {
  test("getting student", async () => {
    const response = await request(Test).get("/student");
    expect(response.status).toBe(200);
  });
});

describe("GET student by classId", () => {
  test("getting student by classId", async () => {
    const response = await request(Test).get("/studentclass/" + 104);
    expect(response.status).toBe(200);
  });
});

describe("GET student by teacherId", () => {
  test("getting student by teacherId", async () => {
    const response = await request(Test).get("/studentteacher/" + 4);
    expect(response.status).toBe(200);
  });
});

describe("GET student by subjectId", () => {
  test("getting student by subjectId", async () => {
    const response = await request(Test).get("/studentsubject/" + 3);
    expect(response.status).toBe(200);
  });
});

describe("POST /student", () => {
  test("adding student in student table", async () => {
    const addStudent = {
      studentId: 15,
      name: "Minamma",
      dob: "2003-09-28",
      gender: "female",
    };
    const response = await request(Test).post("/student").send(addStudent);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      msg: "data is inserted in students table",
    });
  });
});

// class
describe("GET class", () => {
  test("gettig class", async () => {
    const response = await request(Test).get("/class");
    expect(response.status).toBe(200);
  });
});

describe("POST /class", () => {
  test("adding class in table", async () => {
    const addClass = {
      classId: 102,
      stId: 15,
    };
    const response = await request(Test).post("/class").send(addClass);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      msg: "data is inserted in classes table",
    });
  });
});

// teacher
describe("GET teacher", () => {
  test("gettig teacher", async () => {
    const response = await request(Test).get("/teacher");
    expect(response.status).toBe(200);
  });
});

describe("POST /teacher", () => {
  test("adding teacher in table", async () => {
    const addTeacher = {
      teacherId: 10,
      teacher_fname: "Ramanand",
      teacher_lname: "Yadav",
      gender: "male",
    };
    const response = await request(Test).post("/teacher").send(addTeacher);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      msg: "data is inserted in teacher table",
    });
  });
});

// subject
describe("GET subject", () => {
  test("gettig subject", async () => {
    const response = await request(Test).get("/subject");
    expect(response.status).toBe(200);
  });
});

describe("POST /subject", () => {
  test("adding subject in table", async () => {
    const addSubject = {
      subjectId: 10,
      subject_name: "Mathematics",
    };
    const response = await request(Test).post("/subject").send(addSubject);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      msg: "data is inserted in Subject table",
    });
  });
});

// schedule
describe("GET schedule", () => {
  test("gettig schedule", async () => {
    const response = await request(Test).get("/schedule");
    expect(response.status).toBe(200);
  });
});

describe("POST /schedule", () => {
  test("adding schedule in table", async () => {
    const addSchedule = {
      cls_Id: 110,
      subjId: 10,
      subject_name: "Mathematics",
      teach_Id: 10,
      teacher_fname: "Ramanand",
    };
    const response = await request(Test).post("/schedule").send(addSchedule);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      msg: "data is inserted in Class_schedule table",
    });
  });
});

// result
describe("GET result", () => {
  test("gettig result", async () => {
    const response = await request(Test).get("/result");
    expect(response.status).toBe(200);
  });
});

describe("post /result", () => {
  test("adding result in table", async () => {
    const addResult = {
      studentid: 15,
      class_Id: 110,
      subject_Id: 10,
      marks: 62,
    };
    const response = await request(Test).post("/result").send(addResult);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      msg: "data is inserted in result table",
    });
  });
});

describe("put /result", () => {
  test("update marks by studentId and subjectId", async () => {
    const updateMarks = {
      studentid: 14,
      subject_Id: 9,
      marks: 75,
    };
    const response = await request(Test)
      .put("/result/" + 14 + "/" + 9)
      .send(updateMarks);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      msg: "marks are updated in result table",
    });
  });
});

// marks
describe("GET marks by studentId", () => {
  test("gettig marks", async () => {
    const response = await request(Test).get("/subjectmarks/" + 8);
    expect(response.status).toBe(200);
  });
});

// topten
describe("GET topten", () => {
  test("gettig topten", async () => {
    const response = await request(Test).get("/topten/" + 104);
    expect(response.status).toBe(200);
  });
});

// topper
describe("GET topper", () => {
  test("gettig topper", async () => {
    const response = await request(Test).get(
      "/topper/" + 102 + "/subject/" + 2
    );
    expect(response.status).toBe(200);
  });
});

// general

describe("GET /wrong url", () => {
  test("gettig Not Found", async () => {
    const response = await request(Test).get("/wrong");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ msg: "Not Found" });
  });
});

describe("GET /subjectmarks", () => {
  test("gettig somthing wrong", async () => {
    const response = await request(Test).get("/subjectmarks/"+"wer3e");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({msg: `something went wrong`});
  });
});