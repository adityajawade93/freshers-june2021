import { query } from "../db/database";

export async function createClass(id: string, name: string) {
    await query("insert into classes values ($1,$2)", [id, name]);
}

export async function classList() {
    return await query("select * from classes");
}

export async function studentListFromClassid(classid: string) {
    const sql: string = "select students.student_id,student_name from students,student_class where student_class.class_id = $1 and students.student_id = student_class.student_id;"
    return await query(sql, [classid]);
}