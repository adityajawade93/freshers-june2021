import { dbQuery } from "../db/db";


export async function addStudent(id: string, name: string, sex: string | null, age: number | null) {
    try {
        const query = 'insert into student (id, name, sex, age) values ($1, $2, $3, $4)';
        const res = await dbQuery(query, [id, name, sex, age]);

        if (res && res.command === 'INSERT')
            return true;

        return false;

    } catch (e) {
        throw new Error(e);
    }
}

export async function countStudents() {
    try {
        const query = 'select count(*) as total from student';
        const res = await (dbQuery(query));

        return res.rows[0].total;
    } catch (e) {
        throw new Error(e);
    }
}

export async function getStudents() {
    try {
        // offset = null & limit = null ==> fetches all data
        const query = `select * from student`;
        const res = await (dbQuery(query));

        return res.rows;
    } catch (e) {
        throw new Error(e);
    }
}

export async function getStudentMarks(id: string) {
    try {
        const query = `
        select subject.name as subject, mark.marks
        from mark
        inner join student on student.id = mark.student_id
        inner join subject on subject.id = mark.subject_id
        where mark.student_id = $1
      `;
        const res = await (dbQuery(query, [id]));

        return res.rows;
    } catch (e) {
        throw new Error(e);
    }
}