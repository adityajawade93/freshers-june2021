import KoaRouter from "koa-router";

import {
  createMarks,
  fetchMarks,
  fetchHighestMarksPerSubject,
  fetchTopBYNumber,
  fetchTopperPerClass,
  modifyMarks,
} from "../controller/mark";

const router = new KoaRouter({ prefix: "/mark" });

router.post("/", createMarks);

router.get("/student/:st_id", fetchMarks);

router.get("/highest", fetchHighestMarksPerSubject);

router.get("/top/:number", fetchTopBYNumber);

router.get("/topperPerclass", fetchTopperPerClass);

router.patch("/:st_id/:sub_id", modifyMarks);

export default router;
