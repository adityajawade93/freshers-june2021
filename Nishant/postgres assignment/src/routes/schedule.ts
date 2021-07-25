import koarouter from '@koa/router';

import addClassSchedule from '../controller/schedule';

const router = new koarouter();

router.post('/schedule', addClassSchedule);

export default router;
