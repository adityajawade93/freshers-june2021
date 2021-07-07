import Router from '@koa/router';
const router = new Router();

const classs = require('../controller/class');

router.post("/class", classs.createClass);
router.get("/class", classs.classList);
router.get("/student/classid", classs.studentListFromClassid);

module.exports = router;