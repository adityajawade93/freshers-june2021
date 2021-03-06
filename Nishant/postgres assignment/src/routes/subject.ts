import koarouter from '@koa/router';

import {
  getSubject, getStudentBySubjectId, getSubjectMarksByStudentId, addSubject,
} from '../controller/subject';

const router = new koarouter();

router.get('/subject', getSubject);

router.get('/subject/:subjectId/student', getStudentBySubjectId);

router.get('/student/:studentId/subject/marks', getSubjectMarksByStudentId);

router.post('/subject', addSubject);

export default router;
