const koa =  require('koa');
const koarouter = require('@koa/router');

const app= new koa();
const router = new koarouter();

const bodyparser = require('koa-bodyparser');



const studentcontroller= require('./controller/studentcontroller.js')
const resultcontroller = require('./controller/resultcontroller.js')

app.use(bodyparser());

router.get('/',(ctx)=>{
    ctx.body="hello"
})

router.post('/student',studentcontroller.addStudent);
router.get('/student',studentcontroller.getStudent);
router.post('/teacher',studentcontroller.addTeacher);
router.get('/teacher',studentcontroller.getTeacher);
router.post('/subject',studentcontroller.addSubject);
router.get('/subject',studentcontroller.getSubject);
router.post('/class',studentcontroller.addClass);
router.get('/class',studentcontroller.getClass);
router.get('/studentFromClassID/:Classid',studentcontroller.getStudentFromClassID);
router.get('/studentFromSubjectID/:Subjectid',studentcontroller.getStudentFromSubjectID);
router.get('/studentFromTeacherID/:Teacherid',studentcontroller.getStudentFromTeacherID);


router.post('/addMarks',resultcontroller.addMarks);
router.post('/updateMarks',resultcontroller.updateMarks);
router.get('/getMarks/:Studentid',resultcontroller.getMarks);

app.use(router.routes());

app.listen(3000,()=>{
    console.log('server is listening at port 3000');
})