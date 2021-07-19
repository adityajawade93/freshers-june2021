import { query } from "../db/database";

export async function createSubject(id: string, name: string) {
    await query("insert into subjects values ($1,$2)", [id, name]);

}

export async function subjectList() {
    return await query("select * from subjects");
}

export async function studentListBySubjectId(subjectId: string) {
    const sql: string = "select students.student_id,student_name from students,student_subjects where students.student_id = student_subjects.student_id and (student_subjects.first_lang = $1 or student_subjects.second_lang = $1 or student_subjects.opt1 = $1 or student_subjects.opt2 = $1 or student_subjects.opt3 = $1)"
    return await query(sql, [subjectId]);
}