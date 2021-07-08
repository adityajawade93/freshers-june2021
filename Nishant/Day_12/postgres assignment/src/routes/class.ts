import koarouter from '@koa/router';

const router=new koarouter();

import {getClass, getStudentByClassId, addStudentInClass} from '../controller/class';

router.get('/class',getClass);

router.get('/class/:classId/student',getStudentByClassId);

router.post('/class',addStudentInClass);

export {router};