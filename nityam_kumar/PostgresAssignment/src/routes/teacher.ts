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

router.get("/allteacher", getTeachers);

router.get("/allteacher/teaching", getTeachersTeaching);

router.patch("/:teacher_id", modifyTeacher);

router.get("/students/:teacher_id", fetchStudentsWithTeacher);

export default router;
