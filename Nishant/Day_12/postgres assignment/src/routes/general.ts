import koarouter from '@koa/router';

const router=new koarouter();

import {gettopperByclassIdAndSubjectId, gettopstudent} from '../controller/general';

router.get('/topper/class/:classId/subject/:subjectId',gettopperByclassIdAndSubjectId);

router.get('/toppers/class/:classId/:count',gettopstudent);

export {router};