import {router} from "./index"
import {all_teachers,student_of_teacher,add_teacher} from "../controller/teacher"

router.get("/school/teacher", all_teachers);//List of all teachers
router.get("/school/teacher/student/:id", student_of_teacher);//List of all student Given TeacherId
router.post("/teacher", add_teacher);//Create Teachers
