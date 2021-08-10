// const koarouter = require('@koa/router');
// const marksController = require('../controller/marks.controller');

import koarouter from '@koa/router';
import * as marksController from '../controller/marks.controller';

const router = new koarouter();

router.get('/marks/student/:id', marksController.getMarksByStudentId);
router.get('/marks/highest/subject/:id', marksController.highestMarksBySubject);

// For Require somewhere
// module.exports = router;

// For import somewhere
export default router;
