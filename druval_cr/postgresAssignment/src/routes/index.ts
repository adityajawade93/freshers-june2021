import combineRouters from 'koa-combine-routers';

import studentRouter from './student';
import teacherRouter from './teacher';
import markRouter from './mark';
import scheduleRouter from './schedule';
import subjectRouter from './subject';
import classRouter from './class';
import generalRouter from './general';

const router = combineRouters(
  studentRouter,
  teacherRouter,
  markRouter,
  scheduleRouter,
  subjectRouter,
  classRouter,
  generalRouter,
);

export default router;
