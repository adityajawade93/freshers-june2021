import { query, setpath, start } from "../db/database";

export async function createResult (student_id: string, class_id: string, sub_id: string, marks: number){

    try {
        await start();
        await setpath();
        await query(`insert into results values (${student_id},${class_id},${sub_id},${marks})`);
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }

}

export async function updateResult (st_id: string, sub_id: string, marks: number) {
    try {
        await start();
        await setpath();
        await query(`update results set marks = ${marks} where student_id = '${st_id}' and subject_id = '${sub_id}'`);
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }
}

export async function MarksStudentid (student_id: string) {
    try {
        await start();
        await setpath();
        var sql: string = `select subject_id,marks from results where student_id = ${student_id};`
        let res: any = await query(sql);
        return res;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }

}

export async function highestMarks (class_id: string, sub_id: string) {
    try{
        await start();
        await setpath();
        var sql: string = `select results.student_id,student_name,marks from students,results where students.student_id = results.student_id and class_id = '${class_id}' and subject_id = '${sub_id}' and marks = (select max(marks) from results where class_id = '${class_id}' and subject_id = '${sub_id}');`
        let res: any = await query(sql);
        return res;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }

}

export async function topNstudents (n: number){
    try{
        await start();
        await setpath();
        var sql: string = `select student_id,student_name,class_id,marks from (
            select student_id,student_name,class_id, marks,  dense_rank() OVER (
                PARTITION BY class_id
                ORDER BY marks DESC ) ab
                from (
            select
            ax.student_id,student_name,class_id, sum(marks) as marks
            from results ax inner join students bx on ax.student_id = bx.student_id
            group by ax.student_id,student_name, class_id) as hd) as bd
            where ab<= ${n};`;
        let res: any = await query(sql);
        return res;
    }
    catch (error) {
        console.log(`something went wrong  ${error}`);
        throw new error;
    }

}