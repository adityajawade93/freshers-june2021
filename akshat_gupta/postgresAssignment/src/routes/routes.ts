import Router from 'koa-router';

import { addClass, getClassId, getClasses } from '../controller/class-controller';
import { addMarks, updateMarks } from '../controller/mark-controller';
import { getStudents, addStudent, getStudentMarks, getStudentClassId, getStudentSubjectId, getStudentTeacherId } from '../controller/student-controller';
import { getSubjects, addSubject } from '../controller/subject-controller';
import { getTeachers, addTeacher } from '../controller/teacher-controller';

export const router = new Router();

//class
router.get('/class', getClasses);
router.get('/class/:id', getClassId);
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
router.get('/student/:teacherid/teacher', getStudentTeacherId); //processing


//subject
router.get('/subject', getSubjects);
router.post('/subject', addSubject);

//teacher
router.get('/teacher', getTeachers);
router.post('/teacher', addTeacher);
