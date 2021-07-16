import { query } from "../db/database";


export async function createTeacher (id: string, name: string, subjectId: string) {
    try {
        await query(`insert into teachers values ($1,$2,$3)`, [id, name, subjectId]);
    }
    catch (err) {
        throw new Error(err);
    }
}

export async function teacherList () {
    try {
        const res: any = await query("select * from teachers");
        return res;
    }
    catch (err) {
        throw new Error(err);
    }
}

export async function studentListByTeacherid (teacherId: string) {
    try {
        const sql: string = `select students.student_id,student_name from students,student_subjects,teachers where teacher_id = $1 and students.student_id = student_subjects.student_id and (student_subjects.first_lang = teachers.subject_id or student_subjects.second_lang = teachers.subject_id or student_subjects.opt1 = teachers.subject_id or student_subjects.opt2 = teachers.subject_id or student_subjects.opt3 = teachers.subject_id);`
        const res: any = await query(sql, [teacherId]);
        return res;
    }
    catch (err) {
        throw new Error(err);
    }
}
