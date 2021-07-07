import { query, setpath, start } from "../db/database";

export async function createClass(id: string, name: string) {

    try {
        await start();
        await setpath();
        var res = await query(`insert into classes values (${id},${name})`);
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }

}

export async function classList (){
    try {
        await start();
        await setpath();
        let res: any = await query("select * from classes");
        return res;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }

}

export async function studentListFromClassid (class_id: string) {

    try {
        await start();
        await setpath();
        var sql: string = `select students.student_id,student_name from students,student_class where student_class.class_id = '${class_id}' and students.student_id = student_class.student_id;`
        let res: any = await query(sql);
        return res;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }

}