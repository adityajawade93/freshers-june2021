import Router from '@koa/router';
const router = new Router();

const result = require('../controller/result');

router.post("/result", result.createResult);
router.put("/result", result.updateResult);
router.get("/marks/studentid", result.MarksStudentid);
router.get("/topper", result.highestMarks ); 
router.get("/top/students", result.topNstudents); 

module.exports = router;