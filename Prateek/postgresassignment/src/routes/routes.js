"use strict";
exports.__esModule = true;
var Router = require("@koa/router");
var router = new Router();
var class_1 = require("../controller/class");
var teacher_1 = require("../controller/teacher");
var subject_1 = require("../controller/subject");
var schedule_1 = require("../controller/schedule");
var result_1 = require("../controller/result");
var general_1 = require("../controller/general");
var student_1 = require("../controller/student");
//class
router.get("/class", class_1.getClass);
router.get("/class/:id", class_1.getStudentByStandard);
//student
router.get("/student", student_1.getStudent);
router.post("/createstudent", student_1.addStudent);
//teacher
router.get("/teacher", teacher_1.getTeacher);
router.get("/teacher/:id", teacher_1.getStudentByStaffId);
router.post("/createteacher", teacher_1.addTeacher);
//subject
router.get("/subject", subject_1.getSubject);
router.get("/subject/:id", subject_1.getStudentBySubjectId);
router.get("/marks/:id", subject_1.getSubjectMarksByStudentId);
router.post("/createsubject", subject_1.addSubject);
//class_schedule
router.post("/createclass_schedule", schedule_1.addClassSchedule);
//result
router.post("/createresult", result_1.addMarks);
router.put("/result", result_1.updateResult);
//general
router.get("/topclass/:c_id/topsubject/:s_id", general_1.gettopperByclassIdAndSubjectId);
exports["default"] = router;
