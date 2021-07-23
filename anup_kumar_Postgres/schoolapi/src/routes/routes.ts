import Router from 'koa-router';
export const router = new Router();

//student
import { getStudent, addStudent } from '../controller/student';
router.get('/school/student', getStudent);
router.post('/student', addStudent);

//teacher
import {
  getTeachers,
  studentOfteacher,
  addTeacher
} from '../controller/teacher';
router.get('/school/teacher', getTeachers);
router.get('/teacher/:teacherId', studentOfteacher);
router.post('/teacher', addTeacher);

//class
import { getClass, studentsOfClass, addClass } from '../controller/class';
router.get('/school/class', getClass);
router.get('/class/:classId', studentsOfClass);
router.post('/class', addClass);

//subject
import {
  getSubject,
  getStudentOfSubject,
  addSubject
} from '../controller/subject';
router.get('/school/subject', getSubject);
router.get('/subject/:subjectId', getStudentOfSubject);
router.post('/subject', addSubject);

//marks
import {
  getMarksOfStudent,
  updateMarks,
  topper,
  highestMarksInSubject,
  addMarks
} from '../controller/marks';
router.get('/marks/:studentId', getMarksOfStudent);
router.post('/updatemarks', updateMarks);
router.post('/marks', addMarks);
router.get('/topper/:topperCount', topper);
router.get('/highestmarks/:subjectId', highestMarksInSubject);
