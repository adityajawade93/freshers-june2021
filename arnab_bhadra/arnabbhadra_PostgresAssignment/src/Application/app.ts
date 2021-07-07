import * as middleware from "../Services/middlware";
import * as teacherMiddleware from "../Services/teacherMiddleware";
import * as subjectMiddleware from "../Services/subjectMiddleware";
import * as classMiddleware from "../Services/classMiddleware";
import * as koa from 'koa';
import * as koaroute from '@koa/router';
import * as bodyparser from 'koa-bodyparser';
import * as message from "../Utility/message";
const router: any = new koaroute();
const app: koa<koa.DefaultState, koa.DefaultContext> = new koa();

router.get("/student", middleware.getStudentInfo);
router.get("/getstudentbyid/:id", middleware.getStudentInfoByStudentid);
router.get("/getstudentbyteacher/:id", middleware.getStudentInfoByTeacherId);
router.get("/getstudentbyclass/:id", middleware.getStudentInfoByClassId);
router.post("/student", middleware.insertStudentInfo);

router.get("/teacher", teacherMiddleware.getTeacherInfo);
router.post("/teacher", teacherMiddleware.insertTeacherInfo);

router.post('/subject', subjectMiddleware.insertSubjectInfo);
router.get('/subject', subjectMiddleware.getSubjectInfo);

router.post('/classschedule', classMiddleware.insertClassScheduleInfo);

router.get('/result/:id', middleware.getToperBySubject);
router.get("/topper", middleware.getTopperOftheClass);
app.use(bodyparser());
app.use(router.routes());
app.use(async (ctx: koa.Context) => {
    ctx.status = 404;
    ctx.body = message.pageNotFoundMessage;
});

module.exports = { app };