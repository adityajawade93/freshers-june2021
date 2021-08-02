import * as studentController from "../Controller/StudentController";
import * as teacherController from "../Controller/TeacherController";
import * as subjectController from "../Controller/SubjectController";
import * as classController from "../Controller/ClassController";
//import * as koaroute from '@koa/router';
const koaroute = require('@koa/router');

const router: any = new koaroute();

router.get("/student", studentController.getStudentInfo);
router.get("/student/:id", studentController.getStudentInfoByStudentid);
router.get("/student/teacher/:id", studentController.getStudentInfoByTeacherId);
router.get("/student/class/:id", studentController.getStudentInfoByClassId);
router.post("/student", studentController.insertStudentInfo);

router.get("/teacher", teacherController.getTeacherInfo);
router.post("/teacher", teacherController.insertTeacherInfo);

router.post('/subject', subjectController.insertSubjectInfo);
router.get('/subject', subjectController.getSubjectInfo);

router.post('/classschedule', classController.insertClassScheduleInfo);

router.get('/result/:id/topper', studentController.getToperBySubject);
router.get("/result/topper/:id", studentController.getTopperOftheClass);

export {router};