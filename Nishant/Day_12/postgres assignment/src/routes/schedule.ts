import koarouter from '@koa/router';

const router=new koarouter();

import {addClassSchedule} from '../controller/schedule';

router.post('/createclass_schedule',addClassSchedule);

export {router};