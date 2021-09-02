export {};
const Router = require('koa-router');
const {getsubjectList, addsubjectToList, updateSubjectToList} = require('../controller/subject.ts');
const router = new Router();

router.get(`/subject/getsubjectList`, getsubjectList);
router.post('/subject/addsubjectToList', addsubjectToList);
router.put('/subject/updateSubjectToList', updateSubjectToList);

module.exports = router;
