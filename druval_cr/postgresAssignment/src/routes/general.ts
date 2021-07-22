import Router from '@koa/router';

import { addStudentToClass, getTopper, getLeaderboard } from '../controller/general';

const router = new Router();

router.post('/add_student_to_class', addStudentToClass);
router.get('/topper/class/:class_id/subject/:subject_id', getTopper);
router.get('/leaderboard', getLeaderboard);

export default router;
