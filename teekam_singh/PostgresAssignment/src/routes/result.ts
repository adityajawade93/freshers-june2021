import Router from '@koa/router';
const router = new Router();

import * as result from '../controller/result';

router.post("/result", result.createResult);
router.put("/result", result.updateResult);
router.get("/marks/:studentId", result.marksByStudentId);
router.get("/topper/class/:classId/subject/:subjectId", result.highestMarks );
router.get("/top/students/:limit", result.topNstudents);

export default router;