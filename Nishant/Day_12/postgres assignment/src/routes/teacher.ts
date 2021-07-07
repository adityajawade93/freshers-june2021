import koarouter from '@koa/router';

const router=new koarouter();

import {getTeacher, addTeacher, getStudentByTeacherId} from '../controller/teacher';

router.get('/teacher',getTeacher);

router.get('/teacher/:id',getStudentByTeacherId );

router.post('/createteacher',addTeacher);

export {router};