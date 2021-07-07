import KoaRouter from "koa-router";

import {
  createSubject,
  getSubject,
  fetchStudentsWithSub,
} from "../controller/subject";

const router = new KoaRouter({ prefix: "/subject" });

router.post("/", createSubject);

router.get("/allSubject", getSubject);

router.get("/students/:sub_id", fetchStudentsWithSub);

export default router;
