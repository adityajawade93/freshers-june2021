import KoaRouter from "koa-router";

import {
  createSubject,
  getSubject,
  fetchStudentsWithSub,
} from "../controller/subject";

const router = new KoaRouter({ prefix: "/subject" });

router.post("/", createSubject);

router.get("/", getSubject);

router.get("/students/:subjectId", fetchStudentsWithSub);

export default router;
