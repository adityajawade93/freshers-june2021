import Router from '@koa/router';
const router = new Router();

import * as classs from '../controller/class';

router.post("/class", classs.createClass);
router.get("/class", classs.classList);
router.get("/class/:classid/students", classs.studentListFromClassid);

export default router;