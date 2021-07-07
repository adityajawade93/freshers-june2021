import Router from '@koa/router';
const router = new Router();

const subject = require('../controller/subject');

router.post("/subject", subject.createSubject);
router.get("/subject", subject.subjectList);
router.get("/student/subid", subject.studentListSubid); 

module.exports = router;