import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import studentcontroller from './controller/student_controller.ts';
import teachercontroller from './controller/teacher_controller.ts';
import subjectcontroller from './controller/subject_controller.ts';
import classcontroller from './controller/class_controller.ts';
import resultcontroller from './controller/result_controller.ts';

const app = new Koa();
const router = new Router();
const port = 3000;

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

app.use(bodyParser());
app.use(router.routes());

app.listen(port, () => {
	console.info('Server started at port:', port);
});
