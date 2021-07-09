import { dbQuery } from "../db/db";

//student_id: string, subject_id: string, marks: number
export async function addMark(requestData: any) {
    try {
        const query = 'insert into mark (studentid, subid, marks) values ($1, $2, $3)';
        const res = await (dbQuery(query, [requestData.studentid, requestData.subid, requestData.marks]));

        if (res && res.command === 'INSERT')
            return true;

        return false;
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function updateMark(marks: number, studentid: string, subid: string) {
    try {
        const query = 'update mark set marks = $1 where studentid = $2 and subid = $3';
        const res = await (dbQuery(query, [marks, studentid, subid]));

        if (res && res.command === 'INSERT')
            return true;

        return false;
    } catch (e) {
        throw new Error(e.message);
    }
}