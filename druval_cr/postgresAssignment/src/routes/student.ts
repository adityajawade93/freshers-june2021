import Router from '@koa/router';

import { getStudents, addStudent, getStudentMarks } from '../controller/student';

const router = new Router({ prefix: '/student' });

router.get('/', getStudents);
router.post('/', addStudent);
router.get('/:student_id/marks', getStudentMarks);

export default router;
