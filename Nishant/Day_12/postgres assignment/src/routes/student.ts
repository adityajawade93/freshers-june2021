/* eslint-disable import/prefer-default-export */
/* eslint-disable new-cap */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import koarouter from '@koa/router';

import { getStudent, addStudent } from '../controller/student';

const router = new koarouter();

router.get('/student', getStudent);

router.post('/student', addStudent);

export { router };
