import koarouter from '@koa/router';

const router=new koarouter();

import {addClassSchedule} from '../controller/schedule';

router.post('/schedule',addClassSchedule);

export {router};