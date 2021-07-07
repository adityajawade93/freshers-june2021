const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const koaroute = require('@koa/router');
const bodyparser = require('koa-bodyparser');
const port = 3000;
const router = new koaroute();
const studntController = require('./controllers/studentcontroller');
const resultController = require('./controllers/resultContoller');
app.use(json());
app.use(bodyparser());

router.get('/', (ctx: any) => {
    ctx.body = "hello";
})

router.get('/student',studntController.getStudents);
router.get('/teacher',studntController.getTeachers);
router.get('/class',studntController.getClasses);
router.get('/subject',studntController.getSubjects);
router.get('/studentbyclass/:classId',studntController.getStudentsByClassId);
router.get('/studentbysubject/:subjectId',studntController.getStudentsBySubjectId);
router.get('/studentbyteacher/:teacherId',studntController.getStudentsByTeacherId);
router.post('/student',studntController.addStudent);
router.post('/subject',studntController.addSubject);
router.post('/teacher',studntController.addTeacher);
router.post('/schedule',studntController.addSchedule);


router.post('/marks',resultController.addMarks);
router.put('/marks',resultController.updateMarks);
router.get('/marks/:studentId',resultController.getMarksByStudentId);
router.get('/highestmarkspersubject/:classId',resultController.getHighestMarksPerSubject);
router.get('/getTop10Marks/:classId',resultController.getTop10Marks);


app.use(router.routes());

const server = app.listen(port, () => {

    console.log("server started successfully");
})



module.exports = server;
