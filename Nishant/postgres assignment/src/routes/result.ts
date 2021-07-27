import koarouter from '@koa/router';

import { addResult, updateResult } from '../controller/result';

const router = new koarouter();

router.post('/result', addResult);

router.put('/result', updateResult);

export default router;
