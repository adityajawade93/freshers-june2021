import { QueryResult } from "pg";
import { query } from "../db/database";

interface ResultRequest {
    studentId: string;
    classId?: string;
    subjectId: string;
    marks: number;
}

export async function createResult(requestBody: ResultRequest): Promise<void> {
    await query("insert into results values ($1,$2,$3,$4)", [requestBody.studentId, requestBody.classId, requestBody.subjectId, requestBody.marks]);
}

export async function updateResult(requestBody: ResultRequest): Promise<void> {
    await query("update results set marks = $1 where student_id = $2 and subject_id = $3", [requestBody.marks, requestBody.studentId, requestBody.subjectId]);
}

export async function marksByStudentId(studentId: string): Promise<QueryResult> {
    return await query("select subject_id,marks from results where student_id = $1 order by subject_id", [studentId]);
}

export async function highestMarks(classId: string, subjectId: string): Promise<QueryResult> {
    const sql: string = "select results.student_id,student_name,marks from students,results where students.student_id = results.student_id and class_id = $1 and subject_id = $2 and marks = (select max(marks) from results where class_id = $1 and subject_id = $2)";
    return await query(sql, [classId, subjectId]);
}

export async function topNstudents(limit: number): Promise<QueryResult> {
    const sql: string = `select student_id,student_name,class_id,marks from (
            select student_id,student_name,class_id, marks,  dense_rank() OVER (
                PARTITION BY class_id
                ORDER BY marks DESC ) ab
                from (
            select
            ax.student_id,student_name,class_id, sum(marks) as marks
            from results ax inner join students bx on ax.student_id = bx.student_id
            group by ax.student_id,student_name, class_id) as hd) as bd
            where ab<= $1`;
    return await query(sql, [limit]);
}