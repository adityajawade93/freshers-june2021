import { dbQuery } from "../db/db";


export async function addMark(student_id: string, subject_id: string, marks: number) {
    try {
        const query = 'insert into mark (student_id, subject_id, marks) values ($1, $2, $3)';
        const res = await (dbQuery(query, [student_id, subject_id, marks]));

        if (res && res.command === 'INSERT')
            return true;

        return false;
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function updateMark(marks: number, student_id: string, subject_id: string) {
    try {
        const query = 'update mark set marks = $1 where student_id = $2 and subject_id = $3';
        const res = await (dbQuery(query, [marks, student_id, subject_id]));

        if (res && res.command === 'INSERT')
            return true;

        return false;
    } catch (e) {
        throw new Error(e.message);
    }
}