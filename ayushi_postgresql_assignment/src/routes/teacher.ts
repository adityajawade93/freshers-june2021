const koaRouter = require('koa-router');
const {getteacherList, addteacherToList, updateTeacherToList} = require('../controller/teacher');
const router = koaRouter();

router.get(`/teacher/getteacherList`, getteacherList);
router.post('/teacher/addteacherToList', addteacherToList);
router.put('/teacher/updateTeacherToList', updateTeacherToList);

export default router;
