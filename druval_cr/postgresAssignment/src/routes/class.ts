import Router from '@koa/router';

import { getClasses, addClass, getClassStudents } from '../controller/class';

const router = new Router({ prefix: '/class' });

router.get('/', getClasses);
router.post('/', addClass);
router.get('/:class_id/students', getClassStudents);

export default router;
