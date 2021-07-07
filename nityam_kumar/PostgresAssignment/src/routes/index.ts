import combineRouters from "koa-combine-routers";

import studentRouter from "./student";
import teacherRouter from "./teacher";
import markRouter from "./mark";
import subjectRouter from "./subject";
import classRouter from "./class";

const router = combineRouters(
  studentRouter,
  teacherRouter,
  markRouter,
  subjectRouter,
  classRouter
);

export default router;
