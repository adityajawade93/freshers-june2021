/* eslint-disable new-cap */
const koa = require('koa');
const koarouter = require('@koa/router');

const app = new koa();
// eslint-disable-next-line new-cap
const router = new koarouter();

const bodyparser = require('koa-bodyparser');

const studentcontroller = require('./controller/studentcontroller.ts');
const teachercontroller = require('./controller/teachercontroller.ts');
const subjectcontroller = require('./controller/subjectcontroller.ts');
const classcontroller = require('./controller/classcontroller.ts');
const resultcontroller = require('./controller/resultcontroller.ts');

app.use(bodyparser());

router.post('/student', studentcontroller.addStudent);
router.get('/student', studentcontroller.getStudent);
router.post('/teacher', teachercontroller.addTeacher);
router.get('/teacher', teachercontroller.getTeacher);
router.post('/subject', subjectcontroller.addSubject);
router.get('/subject', subjectcontroller.getSubject);
router.post('/class', classcontroller.addClass);
router.get('/class', classcontroller.getClass);
router.get('/student/class/:Classid', studentcontroller.getStudentFromClassID);
router.get('/student/subject/:Subjectid', studentcontroller.getStudentFromSubjectID);
router.get('/student/teacher/:Teacherid', studentcontroller.getStudentFromTeacherID);

router.post('/addMarks', resultcontroller.addMarks);
router.post('/updateMarks', resultcontroller.updateMarks);
router.get('/getMarks/:Studentid', resultcontroller.getMarks);
router.get('/getHighestMarksPerSubject/:Classid', resultcontroller.getHighestMarksPerSubject);
router.get('/getToppersMarks/:Classid/:toplimit', resultcontroller.getToppersMarks);

app.use(router.routes());

require('dotenv').config();

const { port } = process.env;
const { host } = process.env;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening at ${host}:${port}`);
});
