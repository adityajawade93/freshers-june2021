const koarouter = require('@koa/router');
const teacherController = require('../controller/teacher.controller');

const router = new koarouter();

router.get('/teachers', teacherController.listAllTeachers);

// For Require somewhere
module.exports = router;

// For import somewhere
export default router;
