// const koarouter = require('@koa/router');
// const classController = require('../controller/class.controller');
import koarouter from '@koa/router';
import * as classController from '../controller/class.controller';

const router = new koarouter();

router.get('/classes', classController.listAllClasses);

// For Require somewhere
// module.exports = router;

// For import somewhere
export default router;
