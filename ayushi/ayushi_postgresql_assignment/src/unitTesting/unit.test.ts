export{};
import request from 'supertest';
const makeapp = require('../index.ts');
const Router = require('./router.ts');

const app = makeapp(Router);

const {addStudentToClassList, addSchedule, addStudentToList, updateStudentToList, addSubjectToList, updateSubjectInList, addTeacherToList, updateTeacherInList} = require('./unit.ts');

import { jest } from '@jest/globals'

describe("POST /class", () => {

  beforeEach(() => {
    addStudentToClassList.mockReset();
    addStudentToClassList.mockResolvedValue(0);
  })

  describe("given a student_id and class_id", () => {
    test("should save the student_id and class_id to the database", async () => {
      const bodyData = [
        {student_id: 26, class_id: 5},
        {student_id: 27, class_id: 4}
      ]
      for (const body of bodyData) {
        addStudentToClassList.mockReset();
        await request(app.callback()).post('/class/addstudentToClassList').send(body);
        expect(addStudentToClassList.mock.calls.length).toBe(1);
        expect(addStudentToClassList.mock.calls[0][0]).toBe(body.student_id);
        expect(addStudentToClassList.mock.calls[0][1]).toBe(body.class_id);
      }
    })

    test("should respond with a json object containg the res ", async () => {
      for (let i = 0; i < 10; i++) {
        addStudentToClassList.mockReset()
        addStudentToClassList.mockResolvedValue(i)
        const response = await request(app.callback()).post('/class/addstudentToClassList').send({ student_id: 24, class_id: 3 });
        expect(response.body.res).toBe(i);
      }
    })

    test("should respond with a 400 status code", async () => {
      const response = await request(app.callback()).post('/class/addstudentToClassList').send({
        student_id: "ytti",
        class_id: 8
      })
      expect(response.statusCode).toBe(400)
    })
  })
});

describe("POST /schedule", () => {

  beforeEach(() => {
    addSchedule.mockReset();
    addSchedule.mockResolvedValue(0);
  })

  describe("given a class_id, subject_id and teacher_id", () => {
    test("should save the class_id, subject_id and teacher_id to the database", async () => {
      const bodyData = [
        {class_id: 5, subject_id: 16, teacher_id: 19},
      ]
      for (const body of bodyData) {
        addSchedule.mockReset();
        await request(app.callback()).post('/schedule/addschedule').send(body);
        expect(addSchedule.mock.calls.length).toBe(1);
        expect(addSchedule.mock.calls[0][0]).toBe(body.class_id);
        expect(addSchedule.mock.calls[0][1]).toBe(body.subject_id);
        expect(addSchedule.mock.calls[0][2]).toBe(body.teacher_id);
      }
    })

    test("should respond with a json object containg the res ", async () => {
      for (let i = 0; i < 10; i++) {
        addSchedule.mockReset()
        addSchedule.mockResolvedValue(i)
        const response = await request(app.callback()).post('/schedule/addschedule').send({ class_id: 12, subject_id: 9, teacher_id: 10 });
        expect(response.body.res).toBe(i);
      }
    })

    test("should respond with a 400 status code", async () => {
      const response = await request(app.callback()).post('/schedule/addschedule').send({
        class_id: "ytti",
        subject_id: 8,
        teacher_id: 6
      })
      expect(response.statusCode).toBe(400)
    })
  })
});

describe("POST /student", () => {

  beforeEach(() => {
    addStudentToList.mockReset();
    addStudentToList.mockResolvedValue(0);
  })

  describe("given a student information", () => {
    test("should save the student information to the database", async () => {
      const bodyData = [
        {student_id: 26, student_name: "Ram Kumar", student_dob: "1997-08-12", student_address: '("Shehdol", "Hotel Landmark road")'
          , student_gender: "male", student_phone: 8575595581}
      ]
      
      for (const body of bodyData) {
        addStudentToList.mockReset();
        await request(app.callback()).post('/student/addstudentToList').send(body);
        expect(addStudentToList.mock.calls.length).toBe(1);
        expect(addStudentToList.mock.calls[0][0]).toBe(body.student_id);
        expect(addStudentToList.mock.calls[0][1]).toBe(body.student_name);
        expect(addStudentToList.mock.calls[0][2]).toBe(body.student_dob);
        expect(addStudentToList.mock.calls[0][3]).toBe(body.student_address);
        expect(addStudentToList.mock.calls[0][4]).toBe(body.student_gender);
        expect(addStudentToList.mock.calls[0][5]).toBe(body.student_phone);
      }
    })

    test("should respond with a json object containing the res ", async () => {
      for (let i = 0; i < 10; i++) {
        addStudentToList.mockReset()
        addStudentToList.mockResolvedValue(i)
        const response = await request(app.callback()).post('/student/addstudentToList').send({ student_id: 27, student_name: "Priya Saxena", student_dob: "1997-06-16", student_address: '("Hyderabad", "Char Meenar road")'
        , student_gender: "female", student_phone: 9475655851});
        expect(response.body.res).toBe(i);
      }
    })

    test("should respond with a 400 status code", async () => {
      const response = await request(app.callback()).post('/student/addstudentToList').send({
        student_id: "hii", 
        student_name: "Ram Kumar", 
        student_dob: "1997-08-12", 
        student_address: '("Shehdol", "Hotel Landmark road")',
        student_gender: "male", 
        student_phone: 8575595581
      })
      expect(response.statusCode).toBe(400)
    })
  })
});

describe("PUT /student", () => {

  beforeEach(() => {
    updateStudentToList.mockReset();
    updateStudentToList.mockResolvedValue(0);
  })

  describe("given a student information", () => {
    test("should update the student information in the database", async () => {
      const bodyData = [
        {student_id: 26, student_name: "Vineet Kumar Sehrawat", student_dob: "1997-08-12", student_address: '("Shehdol", "Hotel Landmark road")'
          , student_gender: "male", student_phone: 8575595581}
      ]
      
      for (const body of bodyData) {
        updateStudentToList.mockReset();
        await request(app.callback()).put('/student/updatestudentToList').send(body);
        expect(updateStudentToList.mock.calls.length).toBe(1);
        expect(updateStudentToList.mock.calls[0][0]).toBe(body.student_id);
        expect(updateStudentToList.mock.calls[0][1]).toBe(body.student_name);
        expect(updateStudentToList.mock.calls[0][2]).toBe(body.student_dob);
        expect(updateStudentToList.mock.calls[0][3]).toBe(body.student_address);
        expect(updateStudentToList.mock.calls[0][4]).toBe(body.student_gender);
        expect(updateStudentToList.mock.calls[0][5]).toBe(body.student_phone);
      }
    })

    test("should respond with a json object containing the res ", async () => {
      for (let i = 0; i < 10; i++) {
        updateStudentToList.mockReset()
        updateStudentToList.mockResolvedValue(i)
        const response = await request(app.callback()).put('/student/updatestudentToList').send({ student_id: 27, student_name: "Priyanka Saxena", student_dob: "1997-06-16", student_address: '("Hyderabad", "Char Meenar road")'
        , student_gender: "female", student_phone: 9475655851});
        expect(response.body.res).toBe(i);
      }
    })

    test("should respond with a 400 status code", async () => {
      const response = await request(app.callback()).put('/student/updatestudentToList').send({
        student_id: "hii", 
        student_name: "Ram Kumar", 
        student_dob: "1997-08-12", 
        student_address: '("Shehdol", "Hotel Landmark road")',
        student_gender: "male", 
        student_phone: 8575595581
      })
      expect(response.statusCode).toBe(400)
    })
  })
});

describe("POST /subject", () => {

  beforeEach(() => {
    addSubjectToList.mockReset();
    addSubjectToList.mockResolvedValue(0);
  })

  describe("given a subject information", () => {
    test("should save the subject information to the database", async () => {
      const bodyData = [
        {subject_id: 16, subject_name: "Environmental Studies"}
      ]
      
      for (const body of bodyData) {
        addSubjectToList.mockReset();
        await request(app.callback()).post('/subject/addsubjectToList').send(body);
        expect(addSubjectToList.mock.calls.length).toBe(1);
        expect(addSubjectToList.mock.calls[0][0]).toBe(body.subject_id);
        expect(addSubjectToList.mock.calls[0][1]).toBe(body.subject_name);
      }
    })

    test("should respond with a json object containing the res ", async () => {
      for (let i = 0; i < 10; i++) {
        addSubjectToList.mockReset()
        addSubjectToList.mockResolvedValue(i)
        const response = await request(app.callback()).post('/subject/addsubjectToList').send({ subject_id: 17, subject_name: "Python Programming"});
        expect(response.body.res).toBe(i);
      }
    })

    test("should respond with a 400 status code", async () => {
      const response = await request(app.callback()).post('/subject/addsubjectToList').send({
        subject_id: "hii", 
        subject_name: "Parallel Computing"
      })
      expect(response.statusCode).toBe(400)
    })
  })
});

describe("PUT /subject", () => {

  beforeEach(() => {
    updateSubjectInList.mockReset();
    updateSubjectInList.mockResolvedValue(0);
  })

  describe("given a subject information", () => {
    test("should update the subject information in the database", async () => {
      const bodyData = [
        {subject_id: 16, subject_name: "Aptitude in C programming"}
      ]
      
      for (const body of bodyData) {
        updateSubjectInList.mockReset();
        await request(app.callback()).put('/subject/updateSubjectToList').send(body);
        expect(updateSubjectInList.mock.calls.length).toBe(1);
        expect(updateSubjectInList.mock.calls[0][0]).toBe(body.subject_id);
        expect(updateSubjectInList.mock.calls[0][1]).toBe(body.subject_name);
      }
    })

    test("should respond with a json object containing the res ", async () => {
      for (let i = 0; i < 10; i++) {
        updateSubjectInList.mockReset()
        updateSubjectInList.mockResolvedValue(i)
        const response = await request(app.callback()).put('/subject/updateSubjectToList').send({ subject_id: 17, subject_name: "Java Programming"});
        expect(response.body.res).toBe(i);
      }
    })

    test("should respond with a 400 status code", async () => {
      const response = await request(app.callback()).put('/subject/updateSubjectToList').send({
        subject_id: "hii", 
        subject_name: "Parallel Computing"
      })
      expect(response.statusCode).toBe(400)
    })
  })
});

describe("POST /teacher", () => {

  beforeEach(() => {
    addTeacherToList.mockReset();
    addTeacherToList.mockResolvedValue(0);
  })

  describe("given a teacher information", () => {
    test("should save the teacher information to the database", async () => {
      const bodyData = [
        {teacher_id: 19, teacher_name: "Ramesh Sahni", teacher_dob: "1985-08-12", teacher_address: '("Kabul", "near Kabul Airport")'
          , teacher_gender: "male", teacher_phone: 7674849809}
      ]
      
      for (const body of bodyData) {
        addTeacherToList.mockReset();
        await request(app.callback()).post('/teacher/addteacherToList').send(body);
        expect(addTeacherToList.mock.calls.length).toBe(1);
        expect(addTeacherToList.mock.calls[0][0]).toBe(body.teacher_id);
        expect(addTeacherToList.mock.calls[0][1]).toBe(body.teacher_name);
        expect(addTeacherToList.mock.calls[0][2]).toBe(body.teacher_dob);
        expect(addTeacherToList.mock.calls[0][3]).toBe(body.teacher_address);
        expect(addTeacherToList.mock.calls[0][4]).toBe(body.teacher_gender);
        expect(addTeacherToList.mock.calls[0][5]).toBe(body.teacher_phone);
      }
    })

    test("should respond with a json object containing the res ", async () => {
      for (let i = 0; i < 10; i++) {
        addTeacherToList.mockReset()
        addTeacherToList.mockResolvedValue(i)
        const response = await request(app.callback()).post('/teacher/addteacherToList').send({ teacher_id: 29, teacher_name: "Nimisha Narayani", teacher_dob: "1967-06-16", teacher_address: '("Bangalore", "Kor Mangla")'
        , teacher_gender: "female", teacher_phone: 8746575946});
        expect(response.body.res).toBe(i);
      }
    })

    test("should respond with a 400 status code", async () => {
      const response = await request(app.callback()).post('/teacher/addteacherToList').send({
        teacher_id: "hii", 
        teacher_name: "Ram Kumar", 
        teacher_dob: "1987-08-12", 
        teacher_address: '("Shehdol", "Hotel Landmark road")',
        teacher_gender: "male", 
        teacher_phone: 8575595581
      })
      expect(response.statusCode).toBe(400)
    })
  })
});

describe("PUT /teacher", () => {

  beforeEach(() => {
    updateTeacherInList.mockReset();
    updateTeacherInList.mockResolvedValue(0);
  })

  describe("given a teacher information", () => {
    test("should update the teacher information in the database", async () => {
      const bodyData = [
        {teacher_id: 19, teacher_name: "Som Gupta", teacher_dob: "1985-08-12", teacher_address: '("Kabul", "near Kabul Airport")'
          , teacher_gender: "male", teacher_phone: 7674849809}
      ]
      
      for (const body of bodyData) {
        updateTeacherInList.mockReset();
        await request(app.callback()).put('/teacher/updateTeacherToList').send(body);
        expect(updateTeacherInList.mock.calls.length).toBe(1);
        expect(updateTeacherInList.mock.calls[0][0]).toBe(body.teacher_id);
        expect(updateTeacherInList.mock.calls[0][1]).toBe(body.teacher_name);
        expect(updateTeacherInList.mock.calls[0][2]).toBe(body.teacher_dob);
        expect(updateTeacherInList.mock.calls[0][3]).toBe(body.teacher_address);
        expect(updateTeacherInList.mock.calls[0][4]).toBe(body.teacher_gender);
        expect(updateTeacherInList.mock.calls[0][5]).toBe(body.teacher_phone);
      }
    })

    test("should respond with a json object containing the res ", async () => {
      for (let i = 0; i < 10; i++) {
        updateTeacherInList.mockReset()
        updateTeacherInList.mockResolvedValue(i)
        const response = await request(app.callback()).put('/teacher/updateTeacherToList').send({ teacher_id: 29, teacher_name: "Nimisha Gupta", teacher_dob: "1967-06-16", teacher_address: '("Bangalore", "Kor Mangla")'
        , teacher_gender: "female", teacher_phone: 8746575946});
        expect(response.body.res).toBe(i);
      }
    })

    test("should respond with a 400 status code", async () => {
      const response = await request(app.callback()).put('/teacher/updateTeacherToList').send({
        teacher_id: "hii", 
        teacher_name: "Ram Kumar", 
        teacher_dob: "1987-08-12", 
        teacher_address: '("Shehdol", "Hotel Landmark road")',
        teacher_gender: "male", 
        teacher_phone: 8575595581
      })
      expect(response.statusCode).toBe(400)
    })
  })
});
