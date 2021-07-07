const koarouter = require("@koa/router");

const router = new koarouter();

const stnt = require('../controller/student');
const tchr = require('../controller/teacher');
const subj = require('../controller/subject');
const cls = require('../controller/class');
const schedule = require('../controller/classSchedule');
const rslt = require('../controller/result');
const topr = require('../controller/topper');
const mark = require('../controller/marks');

router.get('/student',stnt.studentData);
router.get('/student/:clsId',stnt.studentData_by_classId);
router.get('/student/:subjId',stnt.studentData_subjectId);
router.get('/student/:teacherId',stnt.studentData_teacherId);
router.post('/addstudent',stnt.add_student_in_table);

router.get('/teacher',tchr.teacherData);
router.post('/addteacher',tchr.add_teacher_in_table);

router.get('/class',cls.classData);
router.post('/addclasses',cls.add_student_in_classes_table);

router.get('/subject',subj.subjectData);
router.post('/addsubject',subj.add_subject_in_table);


router.get('/result',rslt.resultData); 
router.post('/addresult',rslt.add_reasultData_in_table);
router.put('/updateresult/:stId/:subjId',rslt.updateResult_by_stId_and_sbjId);

router.get('/classschedule',schedule.class_scheduleData);
router.post('/addschedule',schedule.add_class_schedule_in_table);

router.get('/subjectmarks/:subjId',mark.subjectMarks_by_subjectId);

router.get('/topper/:clsId/subject/:subjId',topr.topper_by_clsId_and_subjId);
router.get('/topten/:clsId',topr.topten_by_clsId);


module.exports = router;