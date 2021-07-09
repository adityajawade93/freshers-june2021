// const koarouter = require('@koa/router');
// const subjectController = require('../controller/subject.controller');
import koarouter from '@koa/router';
import * as subjectController from '../controller/subject.controller';

const router = new koarouter();

router.get('/subjects', subjectController.listAllSubjects);

// For Require somewhere
// module.exports = router;

export default router;
