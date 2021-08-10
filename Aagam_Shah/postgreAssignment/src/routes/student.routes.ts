// const koarouter = require('@koa/router');
// // import Router from 'koa';
// const studentController = require('../controller/student.controller');

import koarouter from '@koa/router';
import * as studentController from '../controller/student.controller';

const router = new koarouter();

// http://localhost:3000/subjects?page=1&size=1
router.get('/students', studentController.listAllStudents);
router.get('/students/class/:id', studentController.listStudentOfClass);
router.get('/students/teacher/:id', studentController.listStudentByTeacherId);
router.get('/students/subject/:id', studentController.listStudentOfSubject);
router.get('/students/top/:number', studentController.topStudents);

router.post('/student', studentController.createStudent);

export default router;
