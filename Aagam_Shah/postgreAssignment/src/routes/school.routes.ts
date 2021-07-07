const koarouter = require('@koa/router');
const schoolController = require('../controller/school.controller');

const router = new koarouter();

// http://localhost:3000/subjects?page=1&size=1
router.get('/students', schoolController.listAllStudents);
router.get('/teachers', schoolController.listAllTeachers);
router.get('/classes', schoolController.listAllClasses);
router.get('/subjects', schoolController.listAllSubjects);
router.get('/get/:table/:id', schoolController.getById);
router.get('/students/class/:id', schoolController.studentOfClass);
router.get('/students/teacher/:id', schoolController.studentOfTeacher);
router.get('/students/subject/:id', schoolController.studentOfSubject);
router.get('/marks/student/:id', schoolController.marksOfStudent);
router.get('/highest_mark/subject/:id', schoolController.highestMarkOfSubject);
router.get('/top_students/:number', schoolController.topStudents);

router.post('/student', schoolController.createStudent);
module.exports = router;