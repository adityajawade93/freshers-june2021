import { query, setpath, start } from "../db/database";


export async function createTeacher (id: string, name: string, sub_id: string) {
    try {
        await start();
        await setpath();
        await query(`insert into teachers values (${id},${name},${sub_id})`);
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }
}

export async function teacherList () {
    try {
        await start();
        await setpath();
        let res: any = await query("select * from teachers");
        return res;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }
}

export async function studentListTeacherid (teacher_id: string) {
    try {
        await start();
        await setpath();
        var sql: string = `select students.student_id,student_name from students,student_subjects,teachers where teacher_id ='${teacher_id}' and students.student_id = student_subjects.student_id and (student_subjects.first_lang = teachers.subject_id or student_subjects.second_lang = teachers.subject_id or student_subjects.opt1 = teachers.subject_id or student_subjects.opt2 = teachers.subject_id or student_subjects.opt3 = teachers.subject_id);`
        let res: any = await query(sql);
        return res;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }

}
