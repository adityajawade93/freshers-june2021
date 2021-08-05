const koaRouter = require('koa-router');
const {getsubjectList, addsubjectToList, updateSubjectToList} = require('../controller/subject');
const router = koaRouter();

router.get(`/subject/getsubjectList`, getsubjectList);
router.post('/subject/addsubjectToList', addsubjectToList);
router.put('/subject/updateSubjectToList', updateSubjectToList);

export default router;
