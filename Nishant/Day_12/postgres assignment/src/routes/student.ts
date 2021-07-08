import koarouter from '@koa/router';

const router=new koarouter();

import {getStudent, addStudent} from '../controller/student';

router.get('/student',getStudent);

router.post('/student',addStudent);

export {router};