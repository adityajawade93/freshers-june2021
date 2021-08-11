export {};
const Router = require('koa-router');
const {subjectmarksByStudent, topstudentWithSubject, topscoreStudents} = require('../controller/result.ts');
const router = new Router();

router.get('/result/subjectmarksByStudent/:studentId',subjectmarksByStudent);
router.get('/result/topstudentWithSubject/:classId',topstudentWithSubject);
router.get(`/result/topscoreStudents`,topscoreStudents);

module.exports = router;
