import { query } from "../db/database";

export async function createSubject (id: string, name: string) {
    try {
        await query("insert into subjects values ($1,$2)", [id, name]);
    }
    catch (err) {
        throw new Error(err);
    }
}

export async function subjectList () {
    try {
        const res: any = await query("select * from subjects");
        return res;
    }
    catch (err) {
        throw new Error(err);
    }
}

export async function studentListBySubjectId (subjectId: string) {
    try {
        const sql: string = "select students.student_id,student_name from students,student_subjects where students.student_id = student_subjects.student_id and (student_subjects.first_lang = $1 or student_subjects.second_lang = $1 or student_subjects.opt1 = $1 or student_subjects.opt2 = $1 or student_subjects.opt3 = $1)"
        const res: any = await query(sql, [subjectId]);
        return res;
    }
    catch (err) {
        throw new Error(err);
    }
}