import { QueryResult } from "pg";
import { query } from "../db/database";

export async function createClass(id: string, name: string): Promise<void> {
    await query("insert into classes values ($1,$2)", [id, name]);
}

export async function classList(): Promise<QueryResult> {
    return await query("select * from classes order by class_name");
}

export async function studentListFromClassid(classid: string): Promise<QueryResult> {
    const sql: string = "select students.student_id,student_name from students,student_class where student_class.class_id = $1 and students.student_id = student_class.student_id order by student_name"
    return await query(sql, [classid]);
}