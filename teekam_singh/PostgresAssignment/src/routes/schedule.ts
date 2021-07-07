import Router from '@koa/router';
const router = new Router();

const schedule = require('../controller/schedule');

router.post("/schedule", schedule.createSchedule); 

module.exports = router;