/* eslint-disable import/prefer-default-export */
/* eslint-disable new-cap */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import koarouter from '@koa/router';

import { addClassSchedule } from '../controller/schedule';

const router = new koarouter();

router.post('/schedule', addClassSchedule);

export { router };
