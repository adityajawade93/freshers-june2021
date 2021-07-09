import { Context } from "vm";

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import json from "koa-json";

let app = new Koa();
import { router as studentrouter } from "../routes/student";
import { router as teacherrouter } from "../routes/teacher";
import { router as subjectrouter } from "../routes/subject";
import { router as classrouter } from "../routes/class";
import { router as schedulerouter } from "../routes/schedule";
import { router as resultrouter } from "../routes/result";
import { router as generalrouter } from "../routes/general";

app.use(json());
app.use(bodyParser());

app.use(studentrouter.routes());
app.use(teacherrouter.routes());
app.use(subjectrouter.routes());
app.use(classrouter.routes());
app.use(schedulerouter.routes());
app.use(resultrouter.routes());
app.use(generalrouter.routes());
app.use(async (ctx: Context) => {
  ctx.response.status = 404;
  ctx.response.type = "text/html";
  ctx.body = "Not Found";
});

module.exports = app;
