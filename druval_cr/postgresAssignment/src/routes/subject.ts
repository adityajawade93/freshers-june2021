import Router from '@koa/router';

import { getSubjects, addSubject, getSubjectStudents } from '../controller/subject';

const router = new Router({ prefix: '/subject' });

router.get('/', getSubjects);
router.post('/', addSubject);
router.get('/:subject_id/students', getSubjectStudents);

export default router;
