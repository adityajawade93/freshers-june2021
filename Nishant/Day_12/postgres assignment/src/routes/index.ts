import combineRouters from 'koa-combine-routers';

import studentRouter from './student';
import teacherRouter from './teacher';
import subjectRouter from './subject';
import classRouter from './class';
import scheduleRouter from './schedule';
import resultRouter from './result';
import generalRouter from './general';

const router = combineRouters(
  studentRouter,
  teacherRouter,
  resultRouter,
  scheduleRouter,
  subjectRouter,
  classRouter,
  generalRouter,
);

export default router;
