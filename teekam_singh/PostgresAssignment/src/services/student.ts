import { query, setpath, start } from "../db/database";

export async function createStudent (id: string, name: string) {

    try {
        await start();
        await setpath();
        await query(`insert into students values (${id},${name})`);
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }

}

export async function AddStudentToClass (student_id: string, class_id: string) {

    try {
        await start();
        await setpath();
        await query(`insert into student_class values (${student_id},${class_id})`);
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }
}


export async function studentList (page: number, size: number) { 
    try {
        await start();
        await setpath();
        let res: any = await query(`select * from students offset ${page * size} fetch next ${size} rows only;`);
        return res;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }
}