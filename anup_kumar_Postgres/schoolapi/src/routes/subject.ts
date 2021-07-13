import { router }from "./index"
import { all_subjects, student_of_subject, add_subject } from "../controller/subject";

router.get("/school/subject", all_subjects);//List of All subjects
router.get("/school/subject/student/:id", student_of_subject);//List of all student Given SubjectId
router.post("/subject", add_subject);//Create Subjects
