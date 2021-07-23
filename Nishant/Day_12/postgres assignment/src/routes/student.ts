import koarouter from '@koa/router';

import { getStudent, addStudent } from '../controller/student';

const router = new koarouter();

router.get('/student', getStudent);

router.post('/student', addStudent);

export default router;
