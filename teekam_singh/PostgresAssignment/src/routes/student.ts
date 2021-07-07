import Router from '@koa/router';
const router = new Router();

const student = require('../controller/student');

router.post("/student", student.createStudent);
router.post("/student/class", student.AddStudentToClass);
router.get("/student", student.studentList); 

module.exports = router;