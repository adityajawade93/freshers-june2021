import koarouter from '@koa/router';

const router=new koarouter();

import {addResult, updateResult} from '../controller/result';

router.post('/createresult',addResult);

router.put('/updateresult',updateResult);

export {router};