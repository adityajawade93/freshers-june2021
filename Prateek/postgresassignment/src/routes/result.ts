import koarouter from "@koa/router";

const router = new koarouter();

import { addMarks,updateResult } from "../controller/result";

router.post("/createresult", addMarks);
router.put('/result',updateResult);

export { router };
