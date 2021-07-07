import Router from '@koa/router';
const router = new Router();

const teacher = require('../controller/teacher');

router.post("/teacher", teacher.createTeacher);
router.get("/teacher", teacher.teacherList);
router.get("/student/teacherid", teacher.studentListTeacherid); 

module.exports = router;