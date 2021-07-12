import Koa = require("koa");
import koaRouter = require("koa-router");

import { addClass, getClassId, getClasses } from '../controller/class-controller';
import { addMarks, updateMarks } from '../controller/mark-controller';
import { getStudents, addStudent, getStudentMarks, getStudentClassId, getStudentSubjectId, getStudentTeacherId, getTopTenMarks, getTopScorerEachSub } from '../controller/student-controller';
import { getSubjects, addSubject } from '../controller/subject-controller';
import { getTeachers, addTeacher } from '../controller/teacher-controller';


const app = new Koa();
export const router = new koaRouter();
const port = 3001;

//class
router.get("/class", getClasses);
router.get("/class/:id", getClassId);
router.post('/class', addClass);

//mark
router.post('/mark', addMarks);
router.put('/mark', updateMarks);

//student
router.get('/student', getStudents);
router.post('/student', addStudent);
router.get('/student/:studentid/marks', getStudentMarks); //working
router.get('/student/:classid/class', getStudentClassId);  //working
router.get('/student/:subid/subject', getStudentSubjectId); //working
router.get('/student/:teacherid/teacher', getStudentTeacherId); //working
router.get('/student/:subid/topten', getTopTenMarks); //working
router.get('/student/subjecttopper', getTopScorerEachSub); // working

//subject
router.get('/subject', getSubjects);
router.post('/subject', addSubject);

//teacher
router.get('/teacher', getTeachers);
router.post('/teacher', addTeacher);
