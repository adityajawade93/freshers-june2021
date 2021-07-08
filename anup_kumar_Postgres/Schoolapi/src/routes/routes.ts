import Router from "koa-router";
export const router = new Router();

import { getClasses, studentsOfClass, createClass } from "../controller/class";
import { allSubjects, subjectStudent, addSubject } from "../controller/subject";
import { addStudents, getStudents } from "../controller/student";
import { addTeacher, getTeachers, teacherStudent } from "../controller/teacher";
import { addMarks, getMarks } from "../controller/marks";

router.get("/school/class", getClasses);
router.get("/school/student/class/:id", studentsOfClass);
router.post("/class", createClass);

router.get("/school/subject", allSubjects);
router.get("/school/subject/student/:id", subjectStudent);
router.post("/subject", addSubject);

router.get("/school/student", getStudents);
router.post("/student", addStudents);

router.get("/school/teacher", getTeachers);
router.get("/school/teacher/student/:id", teacherStudent);
router.post("/teacher", addTeacher);

router.get("/school/marks", getMarks);
router.post("/marks", addMarks);
