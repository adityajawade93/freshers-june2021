import {router} from "./index"
import { all_classes,student_of_class,add_class}  from  "../controller/class"

router.get("/school/class", all_classes); //List of all classes
router.get("/school/student/class/:id", student_of_class); //List of all student Given classId
router.post("/class", add_class);// Create class
