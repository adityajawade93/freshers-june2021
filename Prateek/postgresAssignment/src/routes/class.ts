import koarouter from "@koa/router";

const router = new koarouter();

import { getClass, getStudentByStandard } from "../controller/class";

router.get("/class", getClass);

router.get("/class/:id", getStudentByStandard);

export { router };
