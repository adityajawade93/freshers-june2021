const Koa = require('koa')
const Router = require('@koa/router')
const bodyParser = require('koa-bodyparser')
import * as student from '../controller/students'
import * as teacher from '../controller/teachers'
import * as subjects from '../controller/subjects'
import * as sechdule from '../controller/sechdule'
import * as classes from '../controller/classes'
import * as marks from '../controller/marks'
import * as standards from '../controller/standards'

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


export const router = new Router()

//students
//get students 
router.get('/school/students', student.getStudents)
//get studentbyid
router.get('/school/studentid/:studentid/students', student.getStudentByStudentId)
//get students by teacherid
router.get('/school/teacherid/:teacherid/students', student.getStudentsByTeacherId)
//get students by subjectid
router.get('/school/subjectname/:subjectname/students', student.getStudentsBySubName)
//create student
router.post('/school/addstudent/students', student.addStudents)

//teachers
//get teachers
router.get('/school/teachers', teacher.getTeachers)
//get teacherbyid
router.get('/school/teacherid/:teacherid/teachers', teacher.getTeacherById)
//create teacher
router.post('/school/addteacher/teachers', teacher.addTeachers)

//subjects
//get subjects
router.get('/school/subjects', subjects.getSubjects)
//create subjects
router.post('/school/addsubject/subjects', subjects.addSubjects)

//sechdule
//get sechdule by class
router.get('/school/classid/:classid/sechdule', sechdule.getSechduleByClass)
//create sechdule
router.post('/school/addsechdule/sechdule', sechdule.addSechdule)

//class
//get students by class
router.get('/school/student_classid/:student_classid/classes', classes.getStudentsByClass)
//add students to class
router.post('/school/addstudentstoclass/classes', classes.addStudentsToClass)

//marks
//all subject marks given student id
router.get('/school/studentid/:studentid/marks', marks.getStudentMarksById)
// get highest mark of a student per subject given class and subject 
router.get('/school/highestmarks/marks', marks.getHighestMarks)
//create marks
router.post('/school/addmarks/marks', marks.addMarks)
//get top 10 students in class
router.get('/school/topten/:student_class_id/marks', marks.topTenInClass)
// update marks
router.put('/school/updateMarks/marks', marks.updateMarks)

//standards
//get standards
router.get('/school/standards',standards.getstandard)
//add standards
router.post('/school/addstandards/standards',standards.addStandard)