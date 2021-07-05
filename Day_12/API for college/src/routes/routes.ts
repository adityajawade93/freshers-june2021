
const koarouter=require("@koa/router");

let router=new koarouter();
const controller=require('../controller/controller');



router.get('/student',controller.getStudent);
router.get('/teacher',controller.getTeacher);
router.get('/subject',controller.getSubject);
router.get('/class',controller.getClass);
router.get('/class/:id',controller.getStudentByClassId);
router.get('/teacher/:id',controller.getStudentByTeacherId );
router.get('/subject/:id',controller.getStudentBySubjectId);
router.get('/marks/:id',controller.getSubjectMarksByStudentId);
router.get('/topclass/:c_id/topsubject/:s_id',controller.gettopperByclassIdAndSubjectId);
router.get('/topten/:c_id',controller.gettoptenstudent);

router.post('/createstudent',controller.addStudent);
router.post('/createteacher',controller.addTeacher);
router.post('/createclass_student',controller.addStudentInClass);
router.post('/createsubject',controller.addSubject);
router.post('/createclass_schedule',controller.addClassSchedule);
router.post('/createresult',controller.addResult);
router.put('/updateresult',controller.updateResult);




  module.exports=router;
  
   