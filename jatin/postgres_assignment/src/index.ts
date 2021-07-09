const koa = require('koa');
const koarouter = require('@koa/router');

const app = new koa();
const router = new koarouter();

const bodyparser = require('koa-bodyparser');



const studentcontroller = require('./controller/studentcontroller')
const teachercontroller = require('./controller/teachercontroller');
const subjectcontroller = require('./controller/subjectcontroller');
const classcontroller = require('./controller/classcontroller')
const resultcontroller = require('./controller/resultcontroller')

app.use(bodyparser());

router.get('/', (ctx: { body: string; }) => {
    ctx.body = "hello"
})

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
router.get('/getHighestMarksPerSubject', resultcontroller.getHighestMarksPerSubject);
router.get('/getToppersMarks/:Classid/:toplimit', resultcontroller.getToppersMarks)

app.use(router.routes());

app.listen(3000, () => {
    console.log('server is listening at port 3000');
})