import Router from '@koa/router';

import { addMarks, updateMarks } from '../controller/mark';

const router = new Router({ prefix: '/mark' });

router.post('/', addMarks);
router.put('/', updateMarks);

export default router;
