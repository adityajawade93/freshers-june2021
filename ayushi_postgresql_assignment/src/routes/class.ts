const koaRouter = require('koa-router');
const {getclassList, addstudentToClassList, getstudentsByClass} = require('../controller/class');
const router = koaRouter();

router.get(`/class/getclassList`, getclassList);
router.post('/class/addstudentToClassList', addstudentToClassList);
router.get('/class/getstudentsByClass/:classId', getstudentsByClass);

export default router;
