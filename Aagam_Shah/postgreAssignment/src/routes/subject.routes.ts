const koarouter = require('@koa/router');
const subjectController = require('../controller/subject.controller');

const router = new koarouter();

router.get('/subjects', subjectController.listAllSubjects);

// For Require somewhere
module.exports = router;

export default router;
