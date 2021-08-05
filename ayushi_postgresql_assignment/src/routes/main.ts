const combineRouters = require('koa-combine-routers');
import * as studentRouter from './student';
import * as teacherRouter from './teacher';
import * as subjectRouter from './subject';
import * as classRouter from './class';
import * as resultRouter from './result';
import * as scheduleRouter from './schedule';

const router = combineRouters (
  studentRouter,
  teacherRouter,
  subjectRouter,
  classRouter,
  resultRouter,
  scheduleRouter
);

//export default router;
module.exports = router;
