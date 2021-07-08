import combineRouters from 'koa-combine-routers';

import {router as studentRouter} from './student';
import {router as teacherRouter} from '../routes/teacher';
import {router as subjectRouter} from '../routes/subject';
import {router as classRouter} from '../routes/class';
import {router as scheduleRouter} from '../routes/schedule';
import {router as resultRouter} from '../routes/result';
import {router as generalRouter} from '../routes/general';

const router = combineRouters(
    studentRouter,
    teacherRouter,
    resultRouter,
    scheduleRouter,
    subjectRouter,
    classRouter,
    generalRouter,
  );

  export default router;