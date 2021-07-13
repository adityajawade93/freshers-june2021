import {router} from "./index"
import {all_students,add_students} from "../controller/student"

router.get("/school/student", all_students);// List of all students -- with pagination
router.post("/student", add_students);//Create student
