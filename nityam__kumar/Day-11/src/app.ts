import Koa from "koa";

import bodyParser from "koa-bodyparser";

import KoaRouter from "koa-router";

import json from "koa-json";

import {
  createStudent,
  createTeacher,
  createSubject,
  getStudents,
  getTeachers,
  createMarks,
  getTeachersTeaching,
  getClasses,
  getSubject,
  fetchStudentsWithClass,
  fetchStudentsWithTeacher,
  fetchStudentsWithSub,
  fetchMarks,
  fetchHighestMarksPerSubject,
  fetchTopTen,
  fetchTopperPerClass,
  modifyStudent,
  modifyTeacher,
  modifyMarks,
} from "./routes_and_controller";

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());
app.use(json());
app.use(router.routes()).use(router.allowedMethods());

// Create Students
router.post("/student", createStudent);

// Create Teachers
router.post("/teacher", createTeacher);

// Create Subjects
router.post("/subject", createSubject);

//Create Marks
router.post("/marks", createMarks);

router.patch("/student/:st_id", modifyStudent);

router.patch("/teacher/:teacher_id", modifyTeacher);

router.patch("/marks/:st_id/:sub_id", modifyMarks);

// List of all Student - with pagination
router.get("/allstudent", getStudents);

// List of all Teachers
router.get("/allteacher", getTeachers);

// --List of all teachers associated with any subject
router.get("/allteacher/teaching", getTeachersTeaching);

// List of all Classes
router.get("/allclasses", getClasses);

// List of all Subjects
router.get("/allSubject", getSubject);

// List of all student Given classId
router.get("/students/:cl_id", fetchStudentsWithClass);
// List of all student Given TeacherId
router.get("/students/:teacher_id", fetchStudentsWithTeacher);
// List of all student Given SubjectId
router.get("/students/:sub_id", fetchStudentsWithSub);
// List of all subject marks given studentId
router.get("/students/:st_id", fetchMarks);

// List of highest mark per subject and return student info
router.get("/highestmarks", fetchHighestMarksPerSubject);

// List of top 10 scores(sum all subject),
router.get("/topTen", fetchTopTen);


router.get("/topperPerclass", fetchTopperPerClass);

export default app;
