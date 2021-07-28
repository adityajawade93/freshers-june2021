import koarouter from '@koa/router';

import { getClass, getStudentByClassId, addStudentInClass } from '../controller/class';

const router = new koarouter();

router.get('/class', getClass);

router.get('/class/:classId/student', getStudentByClassId);

router.post('/class', addStudentInClass);

export default router;
