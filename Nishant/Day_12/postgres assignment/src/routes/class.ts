import koarouter from '@koa/router';

const router=new koarouter();

import {getClass, getStudentByClassId, addStudentInClass} from '../controller/class';

router.get('/class',getClass);

router.get('/class/:id',getStudentByClassId);

router.post('/createclass_student',addStudentInClass);

export {router};