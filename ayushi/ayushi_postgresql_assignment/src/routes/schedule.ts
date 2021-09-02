export {};
const Router = require('koa-router');
const {addschedule, studentsbyClass, studentsByTeacher, studentsBySubject} = require('../controller/schedule.ts');
const router = new Router();

router.get(`/schedule/studentsbyClass/:classId`, studentsbyClass);
router.post('/schedule/addschedule', addschedule);
router.get('/schedule/studentsByTeacher/:teacherId', studentsByTeacher);
router.get('/schedule/studentsBySubject/:subjectId', studentsBySubject);

module.exports = router;
