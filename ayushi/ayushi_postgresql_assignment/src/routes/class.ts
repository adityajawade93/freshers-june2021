export {};
const Router = require('koa-router');
const {getclassList, addstudentToClassList, getstudentsByClass} = require('../controller/class.ts');
const router = new Router();

router.get(`/class/getclassList`, getclassList);
router.post('/class/addstudentToClassList', addstudentToClassList);
router.get('/class/getstudentsByClass/:classId', getstudentsByClass);

module.exports = router;
