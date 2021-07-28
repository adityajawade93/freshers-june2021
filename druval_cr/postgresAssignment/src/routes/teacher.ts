import Router from '@koa/router';

import { getTeachers, addTeacher, getTeacherStudents } from '../controller/teacher';

const router = new Router({ prefix: '/teacher' });

router.get('/', getTeachers);
router.post('/', addTeacher);
router.get('/:teacher_id/students', getTeacherStudents);

export default router;
