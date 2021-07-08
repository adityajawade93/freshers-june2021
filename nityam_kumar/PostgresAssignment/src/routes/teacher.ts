import KoaRouter from "koa-router";

import {
  createTeacher,
  getTeachers,
  getTeachersTeaching,
  modifyTeacher,
  fetchStudentsWithTeacher,
} from "../controller/teacher";

const router = new KoaRouter({ prefix: "/teacher" });

router.post("/", createTeacher);

router.get("/", getTeachers);

router.get("/teaching", getTeachersTeaching);

router.patch("/:teacherId", modifyTeacher);

router.get("/students/:teacherId", fetchStudentsWithTeacher);

export default router;
