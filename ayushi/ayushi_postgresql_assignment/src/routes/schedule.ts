const koaRouter = require('koa-router');
const {addschedule, studentsbyClass, studentsByTeacher} = require('../controller/schedule');
const router = koaRouter();

router.get(`/schedule/studentsbyClass/:classId`, studentsbyClass);
router.post('/schedule/addschedule', addschedule);
router.get('/schedule/studentsByTeacher/:teacherId', studentsByTeacher);

export default router;
