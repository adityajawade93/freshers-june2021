import KoaRouter from "koa-router";

import {
  getClasses,
  getSchedule,
  fetchStudentsWithClass,
} from "../controller/class";

const router = new KoaRouter({ prefix: "/class" });

router.get("/all", getClasses);

router.get("/schedule", getSchedule);

router.get("/students/:cl_id", fetchStudentsWithClass);

export default router;
