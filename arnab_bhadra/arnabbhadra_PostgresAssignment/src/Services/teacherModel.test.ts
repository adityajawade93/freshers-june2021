import { Teacher } from "./Teacher";
import * as teacherModel from "./TeacherModel";
import * as uuid from 'uuid';
describe("Test case for validating teacher model database operations", () => {
    test("Test case for geting teachers information from database", async () => {
        const teachersInfo: any = await teacherModel.getTeacherInfo();
        expect(teachersInfo.length > 0).toBe(true);
    });
    test("Test case for getting number of teachers in database", async () => {
        const noOfTeacher: any = await teacherModel.getNumberOfTeachers();
        expect(noOfTeacher[0].count > 0).toBe(true);
    });
    test("Test case for inserting a teacher info in database", async () => {
        const newTeacher: Teacher = {
            tid: uuid.v4(),
            tname: "demo teacher 1",
            contactno: 12345678,
            specialization: "Computer Science"
        }
        const teacherEntity=[newTeacher.tid, newTeacher.tname, newTeacher.specialization, newTeacher.contactno];
        const response =await teacherModel.insertTeacherInfo(teacherEntity);
        console.log(response);
        expect(response).toStrictEqual([]);
    });
});