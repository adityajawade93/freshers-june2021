const koarouter = require("@koa/router");

const router = new koarouter();

const student = require('../controller/student');
const teacher = require('../controller/teacher');
const subject = require('../controller/subject');
const clas = require('../controller/class');
const schedule = require('../controller/classSchedule');
const result = require('../controller/result');
const topper = require('../controller/topper');
const mark = require('../controller/marks');

router.get('/student',student.getStudentData);
router.get('/studentclass/:classId',student.studentData_by_classId);
router.get('/studentsubject/:subjectId',student.studentData_subjectId);
router.get('/studentteacher/:teacherId',student.studentData_teacherId);
router.post('/addstudent',student.add_student_in_table);

router.get('/teacher',teacher.getTeacherData);
router.post('/addteacher',teacher.add_teacher_in_table);

router.get('/class',clas.getClassInfo);
router.post('/addclasses',clas.addStudentInClass);

router.get('/subject',subject.getSubjectData);
router.post('/addsubject',subject.add_subject_in_table);


router.get('/result',result.getResultData); 
router.post('/addresult',result.add_reasultData_in_table);
router.put('/updateresult/:stId/:subjId',result.updateResult_by_studentId_and_subjectId);

router.get('/classschedule',schedule.getClass_scheduleData);
router.post('/addschedule',schedule.add_class_schedule_in_table);

router.get('/subjectmarks/:studentId',mark.getSubjectMarks_by_studentId);

router.get('/topper/:classId/subject/:subjectId',topper.getTopper_by_classId_and_subjectId);
router.get('/topten/:classId',topper.getTopTen_by_classId);


module.exports = router;