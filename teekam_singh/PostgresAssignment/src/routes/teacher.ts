import Router from '@koa/router';
const router = new Router();

import * as teacher from '../controller/teacher';

router.post("/teacher", teacher.createTeacher);
router.get("/teacher", teacher.teacherList);
router.get("/teacher/:id/students", teacher.studentListByTeacherid);

export default router;