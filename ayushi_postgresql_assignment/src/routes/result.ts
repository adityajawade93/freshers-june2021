const koaRouter = require('koa-router');
const {subjectmarksByStudent, topstudentWithSubject, topscoreStudents} = require('../controller/result');
const router = koaRouter();

var classId;
var subjectId;
router.get('/result/subjectmarksByStudent/:studentId',subjectmarksByStudent);
router.get('/result/topstudentWithSubject/:classId',topstudentWithSubject);
router.get(`/result/topscoreStudents?classId=${classId}&subjectId=${subjectId}`);

export default router;
