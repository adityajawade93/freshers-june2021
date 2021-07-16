import { query } from "../db/database";

export async function createClass(id: string, name: string) {
    try {
        await query("insert into classes values ($1,$2)", [id, name]);
    }
    catch (err) {
        throw new Error(err);
    }

}

export async function classList() {
    try {
        const res: any = await query("select * from classes");
        return res;
    }
    catch (err) {
        throw new Error(err);
    }
}

export async function studentListFromClassid(classid: string) {
    try {
        const sql: string = "select students.student_id,student_name from students,student_class where student_class.class_id = $1 and students.student_id = student_class.student_id;"
        const res: any = await query(sql, [classid]);
        return res;
    }
    catch (err) {
        throw new Error(err);
    }
}