import Router from '@koa/router';
const router = new Router();

import * as subject from '../controller/subject';

router.post("/subject", subject.createSubject);
router.get("/subject", subject.subjectList);
router.get("/subject/:id/students", subject.studentListBySubjectId);

export default router;