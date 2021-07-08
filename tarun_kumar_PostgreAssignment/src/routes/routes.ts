import Koa = require("koa");
import koaRouter = require("koa-router");
import uniqid = require("uniqid");
import bodyParser = require("koa-bodyparser");
import { dbStart } from '../db/db'

import { addClass, getClassId, getClasses } from '../controller/class-controller';
import { addMarks, updateMarks } from '../controller/mark-controller';
import { getStudents, addStudent, getStudentMarks } from '../controller/student-controller';
import { getSubjects, addSubject } from '../controller/subject-controller';
import { getTeachers, addTeacher } from '../controller/teacher-controller';


const app = new Koa();
export const router = new koaRouter();
const port = 3001;

//class
router.get("/class", getClasses);
router.get("/class/:name", getClassId);
router.post('/class', addClass);

//mark
router.post('/mark', addMarks);
router.put('/mark', updateMarks);

//student
router.get('/student', getStudents);
router.post('/student', addStudent);
router.get('/:student_id/marks', getStudentMarks);

//subject
router.get('/subject', getSubjects);
router.post('/subject', addSubject);

//teacher
router.get('/teacher', getTeachers);
router.post('/teacher', addTeacher);

/*async function start() {
    try {
        await dbStart();
        console.log('DB Connected');

    } catch (e) {
        console.log(e);
    }
};
start();
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext, any>) => {
    ctx.body = "Invalid URL";
});

const server = app.listen(port, () => console.log("port on ", port));

module.exports = server;

*/
