import Koa from 'koa';
import koaBody from 'koa-body';
import combineRouters from 'koa-combine-routers';
import { setpath, start } from "../db/database";

const help = () => {
    start();
    setpath();
}

help();

const app = new Koa();

import classRouters from '../routes/class';
import resultRouters from '../routes/result';
import scheduleRouters from '../routes/schedule';
import studentRouters from '../routes/student';
import subjectRouters from '../routes/subject';
import teacherRouters from '../routes/teacher';


const router = combineRouters(classRouters, resultRouters, scheduleRouters, studentRouters, subjectRouters, teacherRouters);

app.use(koaBody());
app.use(router());

export default app;