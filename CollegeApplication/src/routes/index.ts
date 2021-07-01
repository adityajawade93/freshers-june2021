import Router from '@koa/router';

import { 
  addStudent,
  addStudentToClass,
  addTeacher,
  addSubject,
  addSchedule,
  addMarks,
  updateMarks,
  getStudents,
  getTeachers,
  getClasses,
  getSubjects,
  addClass,
  getClassStudents,
  getTeacherStudents,
  getSubjectStudents,
  getStudentMarks,
  getTopper,
  getLeaderboard,
} from '../controller/index';

const router = new Router();

router.post('/student', addStudent);
router.get('/student', getStudents);

router.post('/add_student_to_class', addStudentToClass);
router.get('/class/:class_id/students', getClassStudents);
router.get('/teacher/:teacher_id/students', getTeacherStudents);
router.get('/subject/:subject_id/students', getSubjectStudents);
router.get('/topper/class/:class_id/subject/:subject_id', getTopper);

router.post('/teacher', addTeacher);
router.get('/teacher', getTeachers);

router.post('/class', addClass);
router.get('/class', getClasses);

router.post('/subject', addSubject);
router.get('/subject', getSubjects);

router.post('/schedule', addSchedule);

router.post('/mark', addMarks);
router.put('/mark', updateMarks);
router.get('/student/:student_id/marks', getStudentMarks);
router.get('/leaderboard', getLeaderboard);

export default router;