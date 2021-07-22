
import koaRouter = require("koa-router");

import { addClass, getClassId, getClasses } from '../controller/class-controller';
import { addMarks, updateMarks } from '../controller/mark-controller';
import { getStudents, addStudent, getStudentMarks, getStudentByClassId, getStudentBySubjectId, getStudentByTeacherId, getTopTenMarks, getTopScorerEachSub } from '../controller/student-controller';
import { getSubjects, addSubject } from '../controller/subject-controller';
import { getTeachers, addTeacher } from '../controller/teacher-controller';



export const router = new koaRouter();


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
router.get('/student/:classid/class', getStudentByClassId);  //working
router.get('/student/:subid/subject', getStudentBySubjectId); //working
router.get('/student/:teacherid/teacher', getStudentByTeacherId); //working

router.get('/student/:subid/topten', getTopTenMarks); //working
router.get('/student/subjecttopper', getTopScorerEachSub); // working

//subject
router.get('/subject', getSubjects);
router.post('/subject', addSubject);

//teacher
router.get('/teacher', getTeachers);
router.post('/teacher', addTeacher);
