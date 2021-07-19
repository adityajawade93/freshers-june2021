import { router } from "./index";
import { get_marks, add_marks, topper } from "../controller/marks";

router.get("/school/marks", get_marks);
router.post("/marks", add_marks); //Should be Updating Marks
router.get("/school/:num", topper);
