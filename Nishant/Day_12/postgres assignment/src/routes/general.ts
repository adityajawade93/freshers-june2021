/* eslint-disable import/prefer-default-export */
/* eslint-disable new-cap */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import koarouter from '@koa/router';

import { gettopperByclassIdAndSubjectId, gettopstudent } from '../controller/general';

const router = new koarouter();

router.get('/topper/class/:classId/subject/:subjectId', gettopperByclassIdAndSubjectId);

router.get('/toppers/class/:classId/:count', gettopstudent);

export { router };
