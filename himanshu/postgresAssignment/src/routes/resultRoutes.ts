export {};
const Koaroute = require('@koa/router');

const router = new Koaroute();
const resultController = require('../controllers/resultContoller.ts');

router.post('/marks', resultController.addMarks);
router.put('/marks', resultController.updateMarks);
router.get('/marks/:studentId', resultController.getMarksByStudentId);
router.get('/highestmarkspersubject/:classId', resultController.getHighestMarksPerSubject);
router.get('/getleaderboard/:classId/:count', resultController.getleaderboard);

module.exports = router;
