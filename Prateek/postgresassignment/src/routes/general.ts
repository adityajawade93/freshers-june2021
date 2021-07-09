import koarouter from "@koa/router";

const router = new koarouter();

import { gettopperByclassIdAndSubjectId } from "../controller/general";

router.get("/topclass/:c_id/topsubject/:s_id", gettopperByclassIdAndSubjectId);

export { router };
