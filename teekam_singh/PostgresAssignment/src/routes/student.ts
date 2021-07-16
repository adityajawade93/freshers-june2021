import Router from '@koa/router';
const router = new Router();

import * as student from '../controller/student';

router.post("/student", student.createStudent);
router.post("/student/class", student.AddStudentToClass);
router.get("/student", student.studentList);

export default router;