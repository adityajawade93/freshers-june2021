const bodyParser = require("koa-bodyparser");
const Koa = require("koa");
const Router = require("@koa/router");
const json = require("koa-json");
const port: number = 5001;

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

var app = new Koa();
var router = new Router();
//class
app.use(bodyParser());
app.use(json());
router.get("/class", getClass);

router.get("/class/:id", getStudentByStandard);

//student
import { getStudent, addStudent } from "../controller/student";

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

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx: any) => {
  ctx.response.status = 404;
  ctx.response.type = "text/html";
  ctx.body = "Not Found";
});

app.listen(port, () => {
  console.log("server is running on port ", port);
});
