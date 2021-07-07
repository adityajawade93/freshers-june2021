export {};
const Koaroute = require('@koa/router');

const router = new Koaroute();
const studentController = require('../controllers/studentController.ts');

router.get('/student', studentController.getStudents);
router.get('/teacher', studentController.getTeachers);
router.get('/class', studentController.getClasses);
router.get('/subject', studentController.getSubjects);
router.get('/student/class/:classId', studentController.getStudentsByClassId);
router.get('/student/subject/:subjectId', studentController.getStudentsBySubjectId);
router.get('/student/teacher/:teacherId', studentController.getStudentsByTeacherId);
router.post('/student', studentController.addStudent);
router.post('/subject', studentController.addSubject);
router.post('/teacher', studentController.addTeacher);
router.post('/schedule', studentController.addSchedule);

module.exports = router;
