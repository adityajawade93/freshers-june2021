const koaRouter = require('koa-router');
const {getstudentList, getstudentInfoByStudentId, addstudentToList, updatestudentToList} = require('../controller/student');
const router = koaRouter();

var page;
var size;
router.get(`/student/getstudentList?page=${page}&size=${size}`, getstudentList);
router.get('/student/getstudentInfoByStudentId/:studentId', getstudentInfoByStudentId);
router.post('/student/addstudentToList', addstudentToList);
router.put('/student/updatestudentToList', updatestudentToList);

export default router;