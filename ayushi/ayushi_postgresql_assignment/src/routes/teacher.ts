export {};
const Router = require('koa-router');
const {getteacherList, addteacherToList, updateTeacherToList} = require('../controller/teacher.ts');
const router = new Router();

router.get(`/teacher/getteacherList`, getteacherList);
router.post('/teacher/addteacherToList', addteacherToList);
router.put('/teacher/updateTeacherToList', updateTeacherToList);

module.exports = router;
