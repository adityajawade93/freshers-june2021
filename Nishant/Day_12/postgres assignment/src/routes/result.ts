/* eslint-disable import/prefer-default-export */
/* eslint-disable new-cap */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import koarouter from '@koa/router';

import { addResult, updateResult } from '../controller/result';

const router = new koarouter();

router.post('/result', addResult);

router.put('/result', updateResult);

export { router };
