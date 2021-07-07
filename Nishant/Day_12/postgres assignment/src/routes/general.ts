import koarouter from '@koa/router';

const router=new koarouter();

import {gettopperByclassIdAndSubjectId, gettopstudent} from '../controller/general';

router.get('/topclass/:c_id/topsubject/:s_id',gettopperByclassIdAndSubjectId);

router.get('/topten/:c_id/number/:num',gettopstudent);

export {router};