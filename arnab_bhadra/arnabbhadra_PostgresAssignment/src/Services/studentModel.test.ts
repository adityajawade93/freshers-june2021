import * as studentModel from "./StudentModel";
import { Student } from "./Student";
import * as uuid from "uuid";
describe('Test cases for validating student model database operations', () => {
    test('Test case for get stundets information', async () => {
        const studentsInfo: any = await studentModel.getStudentInfo();
        expect(studentsInfo.length > 0).toBe(true);

    });
    test('Test case to fetech number of students', async () => {
        const noofSutdents: any = await studentModel.getStudentNumber();
        expect(noofSutdents[0].count > 0).toBe(true);

    });

    test('Test case to fetch first n toppers', async () => {
        const numberOftopperes: string = "2";
        const toppers = await studentModel.getToppers(numberOftopperes);
        expect(toppers.length > 0 && toppers.length <= Number(numberOftopperes)).toBe(true);
    });

    test('Test case to get student info by student id', async () => {
        const studentsId: string = "a7853177-2887-4dd3-b537-c7486b97f4c5";
        const studentInfo: any = await studentModel.getStudentInfobyStudentId(studentsId);
        expect(studentInfo.length > 0).toBe(true);
        expect(studentInfo[0].sid).toEqual(studentsId);
    });
    test('Test case to get student info by class id', async () => {
        const classId: string = "saqe-dwqd-ddd-asd";
        const studentInfo: any = await studentModel.getStudentInfobyClassId(classId);
        expect(studentInfo.length > 0).toBe(true);

    });
    test('Test case to get student info by teacher id', async () => {
        const teacherId: string = "abgedbdw-askjwqnd-sss";
        const studentInfo: any = await studentModel.getStudentInfobyTeacherId(teacherId);
        expect(studentInfo.length > 0).toBe(true);

    });

    test('Test case to get topper info by subject id', async () => {
        const subjecctId: string = "qwwe-dwd-asdsad";
        const topperInfo: any = await studentModel.getTopperBySubjectId(subjecctId);
        expect(topperInfo.length > 0).toBe(true);

    });

    test('Test case to insert a new student', async () => {
        const newStudent: Student = {
            sid: uuid.v4(),
            sname: "Demo Student",
            rollno: 1512,
            address: "Durgapur"
        }
        const studetEntity = [newStudent.sid, newStudent.sname, newStudent.rollno, newStudent.address];
        const response = await studentModel.insertStudentInfo(studetEntity);
        expect(response).toStrictEqual([]);
    });
});

