import Koa from 'koa';
import koaBody from 'koa-body';
import { setpath, start } from "../db/database";
import combineRouters from 'koa-combine-routers';

const app = new Koa();
const port = 3000;

import classRouters from '../routes/class';
import resultRouters from '../routes/result';
import scheduleRouters from '../routes/schedule';
import studentRouters from '../routes/student';
import subjectRouters from '../routes/subject';
import teacherRouters from '../routes/teacher';

const router = combineRouters(classRouters, resultRouters, scheduleRouters, studentRouters, subjectRouters, teacherRouters);

app.use(koaBody());
app.use(router());

export const server = async () =>{
    try {
        await start();
        await setpath();
        // tslint:disable-next-line:no-console
        console.log("db connected..");
        await app.listen(port);
        // tslint:disable-next-line:no-console
        console.log("started");
    }
    catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
    }
}

