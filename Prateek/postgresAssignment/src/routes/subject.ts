import koarouter from "@koa/router";

const router = new koarouter();

import {
  getSubject,
  getStudentBySubjectId,
  getSubjectMarksByStudentId,
  addSubject,
} from "../controller/subject";

router.get("/subject", getSubject);

router.get("/subject/:id", getStudentBySubjectId);

router.get("/marks/:id", getSubjectMarksByStudentId);

router.post("/createsubject", addSubject);

export { router };
