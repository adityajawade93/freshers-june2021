const koarouter = require('@koa/router');
const marksController = require('../controller/marks.controller');

const router = new koarouter();

router.get('/marks/student/:id', marksController.marksOfStudent);
router.get('/marks/highest/subject/:id', marksController.highestMarkOfSubject);

// For Require somewhere
module.exports = router;

// For import somewhere
export default router;
