import { query } from "../db/database";

export async function createStudent(id: string, name: string) {
    await query("insert into students values ($1,$2)", [id, name]);
}

export async function AddStudentToClass(studentId: string, classId: string) {
    await query("insert into student_class values ($1,$2)", [studentId, classId]);
}

export async function studentList(page: number, size: number) {
    return await query("select * from students offset $1 fetch next $2 rows only", [page * size, size]);
}