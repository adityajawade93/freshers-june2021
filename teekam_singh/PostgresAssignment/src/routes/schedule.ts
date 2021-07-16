import Router from '@koa/router';
const router = new Router();

import * as schedule from '../controller/schedule';

router.post("/schedule", schedule.createSchedule);

export default router;