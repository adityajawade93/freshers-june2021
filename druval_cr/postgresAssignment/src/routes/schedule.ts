import Router from '@koa/router';

import { addSchedule } from '../controller/schedule';

const router = new Router({ prefix: '/schedule' });

router.post('/', addSchedule);

export default router;
