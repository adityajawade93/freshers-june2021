import KoaRouter from "koa-router";

import {
  createStudent,
  modifyStudent,
  getStudents,
} from "../controller/student";

const router = new KoaRouter({ prefix: "/student" });

router.post("/", createStudent);

router.patch("/:st_id", modifyStudent);

router.get("/allstudent", getStudents);

export default router;
