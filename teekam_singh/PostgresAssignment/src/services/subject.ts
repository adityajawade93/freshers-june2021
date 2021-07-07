import { query, setpath, start } from "../db/database";

export async function createSubject (id: string, name: string) {

    try {
        await start();
        await setpath();
        await query(`insert into subjects values (${id},${name})`);
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }

}

export async function subjectList () {

    try {
        await start();
        await setpath();
        let res: any = await query("select * from subjects");
        return res;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }
 
}

export async function studentListSubid (sub_id: string) {

    try {
        await start();
        await setpath();
        var sql: string = `select students.student_id,student_name from students,student_subjects where students.student_id = student_subjects.student_id and (student_subjects.first_lang = '${sub_id}' or student_subjects.second_lang = '${sub_id}' or student_subjects.opt1 = '${sub_id}' or student_subjects.opt2 = '${sub_id}' or student_subjects.opt3 = '${sub_id}');`
        let res: any = await query(sql);
        return res;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }
    
}