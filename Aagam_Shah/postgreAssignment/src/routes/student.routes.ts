const koarouter = require('@koa/router');
// import Router from 'koa';
const studentController = require('../controller/student.controller');

const router = new koarouter();

// http://localhost:3000/subjects?page=1&size=1
router.get('/students', studentController.listAllStudents);
router.get('/students/class/:id', studentController.studentOfClass);
router.get('/students/teacher/:id', studentController.studentOfTeacher);
router.get('/students/subject/:id', studentController.studentOfSubject);
router.get('/students/top/:number', studentController.topStudents);

router.post('/student', studentController.createStudent);

// For Require somewhere
module.exports = router;

// For import somewhere
export default router;
