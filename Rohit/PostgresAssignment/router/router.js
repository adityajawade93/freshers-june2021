var koarouter = require("@koa/router");
var router = new koarouter();
var student = require('../controller/student');
var teacher = require('../controller/teacher');
var subject = require('../controller/subject');
var clas = require('../controller/class');
var schedule = require('../controller/classSchedule');
var result = require('../controller/result');
var topper = require('../controller/topper');
var mark = require('../controller/marks');
router.get('/student', student.getStudentData);
router.get('/studentclass/:classId', student.studentData_by_classId);
router.get('/studentsubject/:subjectId', student.studentData_subjectId);
router.get('/studentteacher/:teacherId', student.studentData_teacherId);
router.post('/student', student.add_student_in_table);
router.get('/teacher', teacher.getTeacherData);
router.post('/teacher', teacher.add_teacher_in_table);
router.get('/class', clas.getClassInfo);
router.post('/classes', clas.addStudentInClass);
router.get('/subject', subject.getSubjectData);
router.post('/subject', subject.add_subject_in_table);
router.get('/result', result.getResultData);
router.post('/result', result.add_reasultData_in_table);
router.put('/result/:studentId/:subjectId', result.updateResult_by_studentId_and_subjectId);
router.get('/classschedule', schedule.getClass_scheduleData);
router.post('/schedule', schedule.add_class_schedule_in_table);
router.get('/subjectmarks/:studentId', mark.getSubjectMarks_by_studentId);
router.get('/topper/:classId/subject/:subjectId', topper.getTopper_by_classId_and_subjectId);
router.get('/topten/:classId', topper.getTopTen_by_classId);
module.exports = router;
