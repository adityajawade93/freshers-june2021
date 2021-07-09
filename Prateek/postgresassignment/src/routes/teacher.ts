import koarouter from "@koa/router";

const router = new koarouter();

import {
  getTeacher,
  addTeacher,
  getStudentByStaffId,
} from "../controller/teacher";

router.get("/teacher", getTeacher);

router.get("/teacher/:id", getStudentByStaffId);

router.post("/createteacher", addTeacher);

export { router };
