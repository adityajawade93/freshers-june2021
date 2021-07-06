const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

import { 
AllStudents,
AllTeachers,
AllClasses,
AllSubjects,
classStudent,
TeacherStudent,
SubjectStudent,
StudentMarks,
highestSubjectMark,
toppper,
createStudent,
createTeacher,
createClass
} from "./db_query";

var app = new Koa();
var router = new Router();

router.get('/school/students', AllStudents)
router.get('/school/teachers', AllTeachers)
router.get('/school/classes', AllClasses)
router.get('/school/subject', AllSubjects)

router.get('/school/class/:id', classStudent);
router.get('/school/teacher/:id', TeacherStudent);
router.get('/school/subject/:id', SubjectStudent);
router.get('/school/student:id', StudentMarks)
router.get('/school/subject/marks:id', highestSubjectMark)
router.get('/school/student:id', toppper)

router.post('/school/students', createStudent)
router.post('/school/teachers', createTeacher)
router.post('/school/class', createClass)




app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(async (ctx: any) => {
    ctx.response.status = 404
    ctx.body = 'error not found'
})
app.listen(3001);