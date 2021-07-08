import KoaRouter from "koa-router";

import {
  getClasses,
  getSchedule,
  fetchStudentsWithClass,
  getClassSchedule,
} from "../controller/class";

const router = new KoaRouter({ prefix: "/class" });

router.get("/", getClasses);

router.get("/scheduleSchool", getSchedule);
router.get("/schedule/:classNumber", getClassSchedule);


router.get("/:classNumber/student", fetchStudentsWithClass);



export default router;
