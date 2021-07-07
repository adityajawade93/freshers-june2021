import { query, setpath, start } from "../db/database";

export async function createSchedule (sub_id: string, class_id: string, teacher_id: string ) {

    try {
        await start();
        await setpath();
        await query(`insert into schedule values (${sub_id},${class_id},${teacher_id})`);
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }

}