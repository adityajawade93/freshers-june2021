export {};
const Router = require('koa-router');
const {getstudentList, getstudentInfoByStudentId, addstudentToList, updatestudentToList} = require('../controller/student.ts');
const router = new Router();

router.get('/student/getstudentList', getstudentList);
router.get('/student/getstudentInfoByStudentId/:studentId', getstudentInfoByStudentId);
router.post('/student/addstudentToList', addstudentToList);
router.put('/student/updatestudentToList', updatestudentToList);

module.exports = router;
