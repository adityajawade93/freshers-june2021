import { QueryResult } from "pg";
import { query } from "../db/database";

export async function createStudent(id: string, name: string): Promise<void> {
    await query("insert into students values ($1,$2)", [id, name]);
}

export async function AddStudentToClass(studentId: string, classId: string): Promise<void> {
    await query("insert into student_class values ($1,$2)", [studentId, classId]);
}

export async function studentList(page: number, size: number): Promise<QueryResult> {
    return await query("select * from students order by student_name offset $1 fetch next $2 rows only", [page * size, size]);
}