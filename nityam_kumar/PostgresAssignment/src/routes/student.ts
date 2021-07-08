import KoaRouter from "koa-router";

import {
  createStudent,
  modifyStudent,
  getStudents,
  getStudentSchedule,
} from "../controller/student";

const router = new KoaRouter({ prefix: "/student" });

router.post("/", createStudent);

router.patch("/:studentID", modifyStudent);

router.get("/", getStudents);

router.get("/schedule/:studentID", getStudentSchedule);

export default router;
