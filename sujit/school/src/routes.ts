const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')

import { getstudents,
getstudentbysid,
getstudentsbytid,
getstudentsbysubname,
createstudents,
getteachers,
getteacherbyid,
createteachers,
getsubjects,
createsubjects,
getsechdulebyclass,
createsechdule,
getstudentsbyclass,
addstudentstoclass,
getstudentmarksbyid,
gethighestmarks,
createmarks, 
topteninclass} from "./controller";

var app = new Koa();
var router = new Router();

//students
//get students 
router.get('/school/students', getstudents)
//get studentbyid
router.get('/school/students/:studentid',getstudentbysid)
//get students by teacherid
router.get('/school/studentsbytid/:teacherid',getstudentsbytid)
//get students by subjectid
router.get('/school/studentsbysub/:subjectname',getstudentsbysubname)
//create student
router.post('/school/students', createstudents)

//teachers
//get teachers
router.get('/school/teachers',getteachers)
//get teacherbyid
router.get('/school/teachers/:id',getteacherbyid)
//create teacher
router.post('/school/teachers',createteachers)

//subjects
//get subjects
router.get('/school/subjects',getsubjects)
//create subjects
router.post('/school/subjects',createsubjects)

//sechdule
//get sechdule by class
router.get('/school/sechdule/:std',getsechdulebyclass)
//create sechdule
router.post('/school/sechdule',createsechdule)

//class
//get students by class
router.get('/school/classes/:std',getstudentsbyclass)
//add students to class
router.post('/school/classes',addstudentstoclass)

//marks
//all subject marks given student id
router.get('/school/marks/:studentid',getstudentmarksbyid)

// get highest mark of a student per subject given class and subject 
router.get('/school/marks',gethighestmarks)

//create marks
router.post('/school/marks',createmarks)

//get top 10 students in class
router.get('/school/topten/:std',topteninclass)




app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(async (ctx: any) => {
    ctx.response.status = 404
    ctx.body = 'error not found'
})
app.listen(3001);