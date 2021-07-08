const koarouter = require('@koa/router');
// import Router from 'koa';
const classController = require('../controller/class.controller');

const router = new koarouter();

router.get('/classes', classController.listAllClasses);

// For Require somewhere
module.exports = router;

// For import somewhere
export default router;
