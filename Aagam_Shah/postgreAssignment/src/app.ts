const koa = require('koa');
const bodyParser = require('koa-bodyparser');
// const schoolRoutes = require('./routes/school.routes');
const studentRoutes = require('./routes/student.routes');
const teacherRoutes = require('./routes/teacher.routes');
const classRoutes = require('./routes/class.routes');
const subjectRoutes = require('./routes/subject.routes');
const marksRoutes = require('./routes/marks.routes');
// import router from './routes/student.routes';

const app = new koa();

app.use(bodyParser());

// app.use(schoolRoutes.routes());
app.use(studentRoutes.routes());
app.use(teacherRoutes.routes());
app.use(classRoutes.routes());
app.use(subjectRoutes.routes());
app.use(marksRoutes.routes());
// app.use(router.routes());

app.use(async (ctx: any) => {
    ctx.response.status = 404;
    ctx.body = "404 Page not found";
    return;
});

// module.exports = app;

export default app;