import KoaRouter from "koa-router";

import {
  createMarks,
  fetchMarks,
  fetchHighestMarksPerSubject,
  fetchTopBYNumber,
  fetchTopperPerClass,
  modifyMarks,
  fetchHighestMarksPerSubjectWithSubjectID,
  fetchTopperPerClassWithClassNumber,
} from "../controller/mark";

const router = new KoaRouter({ prefix: "/marks" });

router.post("/", createMarks);
router.patch("/:studentId/:subjectId", modifyMarks);

router.get("/student/:studentId", fetchMarks);

router.get("/topscore/subject", fetchHighestMarksPerSubject);
router.get(
  "/topscore/subject/:subjectId",
  fetchHighestMarksPerSubjectWithSubjectID
);

router.get("/topscoreSchool/:number", fetchTopBYNumber);

router.get("/topscore/class", fetchTopperPerClass);
router.get("/topscore/class/:classNumber", fetchTopperPerClassWithClassNumber);

export default router;
