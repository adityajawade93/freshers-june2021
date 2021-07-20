const Router = require("@koa/router");
const router = new Router();

import { getClass, getStudentByStandard } from "../controller/class";

import {
  getTeacher,
  addTeacher,
  getStudentByStaffId,
} from "../controller/teacher";

import {
  getSubject,
  getStudentBySubjectId,
  getSubjectMarksByStudentId,
  addSubject,
} from "../controller/subject";

import { addClassSchedule } from "../controller/schedule";

import { addMarks, updateResult } from "../controller/result";

import { gettopperByclassIdAndSubjectId } from "../controller/general";

import { getStudent, addStudent } from "../controller/student";

//class
router.get("/class", getClass);

router.get("/class/:id", getStudentByStandard);

//student

router.get("/student", getStudent);

router.post("/createstudent", addStudent);

//teacher

router.get("/teacher", getTeacher);

router.get("/teacher/:id", getStudentByStaffId);

router.post("/createteacher", addTeacher);

//subject
router.get("/subject", getSubject);

router.get("/subject/:id", getStudentBySubjectId);

router.get("/marks/:id", getSubjectMarksByStudentId);

router.post("/createsubject", addSubject);

//class_schedule
router.post("/createclass_schedule", addClassSchedule);

//result
router.post("/createresult", addMarks);
router.put("/result", updateResult);

//general
router.get("/topclass/:c_id/topsubject/:s_id", gettopperByclassIdAndSubjectId);

export default router;
