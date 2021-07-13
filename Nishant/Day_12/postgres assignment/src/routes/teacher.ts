/* eslint-disable import/prefer-default-export */
/* eslint-disable new-cap */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import koarouter from '@koa/router';

import { getTeacher, addTeacher, getStudentByTeacherId } from '../controller/teacher';

const router = new koarouter();

router.get('/teacher', getTeacher);

router.get('/teacher/:teacherId/student', getStudentByTeacherId);

router.post('/teacher', addTeacher);

export { router };
