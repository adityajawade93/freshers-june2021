const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')

import * as student from './controller/students'
import * as teacher from './controller/teachers'
import * as subjects from './controller/subjects'
import * as sechdule from './controller/sechdule'
import * as classes from './controller/classes'
import * as marks from './controller/marks'


/*
getstudents,
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
topteninclass */

var app = new Koa();
var router = new Router();

//students
//get students 
router.get('/school/students', student.getstudents)
//get studentbyid
router.get('/school/students/:studentid',student.getstudentbysid)
//get students by teacherid
router.get('/school/studentsbytid/:teacherid',student.getstudentsbytid)
//get students by subjectid
router.get('/school/studentsbysub/:subjectname',student.getstudentsbysubname)
//create student
router.post('/school/students',student.createstudents)

//teachers
//get teachers
router.get('/school/teachers',teacher.getteachers)
//get teacherbyid
router.get('/school/teachers/:id',teacher.getteacherbyid)
//create teacher
router.post('/school/teachers',teacher.createteachers)

//subjects
//get subjects
router.get('/school/subjects',subjects.getsubjects)
//create subjects
router.post('/school/subjects',subjects.createsubjects)

//sechdule
//get sechdule by class
router.get('/school/sechdule/:std',sechdule.getsechdulebyclass)
//create sechdule
router.post('/school/sechdule',sechdule.createsechdule)

//class
//get students by class
router.get('/school/classes/:std',classes.getstudentsbyclass)
//add students to class
router.post('/school/classes',classes.addstudentstoclass)

//marks
//all subject marks given student id
router.get('/school/marks/:studentid',marks.getstudentmarksbyid)

// get highest mark of a student per subject given class and subject 
router.get('/school/marks',marks.gethighestmarks)

//create marks
router.post('/school/marks',marks.createmarks)

//get top 10 students in class
router.get('/school/topten/:std',marks.topteninclass)




app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(async (ctx: any) => {
    ctx.response.status = 404
    ctx.body = 'error not found'
})
app.listen(3001);