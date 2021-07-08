import koarouter from '@koa/router';

const router=new koarouter();

import {getTeacher, addTeacher, getStudentByTeacherId} from '../controller/teacher';

router.get('/teacher',getTeacher);

router.get('/teacher/:teacherId/student',getStudentByTeacherId );

router.post('/teacher',addTeacher);

export {router};