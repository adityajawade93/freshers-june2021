const combineRouters = require('koa-combine-routers');
const studentRouter = require('./student.ts');
const teacherRouter = require('./teacher.ts');
const subjectRouter = require('./subject.ts');
const classRouter = require('./class.ts');
const resultRouter = require('./result.ts');
const scheduleRouter = require('./schedule.ts');

const router = combineRouters (
  studentRouter,
  teacherRouter,
  subjectRouter,
  classRouter,
  resultRouter,
  scheduleRouter
);

module.exports = router;
