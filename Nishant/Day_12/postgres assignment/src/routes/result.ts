import koarouter from '@koa/router';

const router=new koarouter();

import {addResult, updateResult} from '../controller/result';

router.post('/result',addResult);

router.put('/result',updateResult);

export {router};