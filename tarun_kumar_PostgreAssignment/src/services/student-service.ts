import { dbQuery } from "../db/db";


export async function addStudent(studentid: string, name: string, sex: string | null, age: number | null, classid: string) {
    try {
        const query = 'insert into student (studentid, name, sex, age, classid) values ($1, $2, $3, $4,$5)';
        const res = await dbQuery(query, [studentid, name, sex, age, classid]);

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
        select subname as subject, mark.marks
        from mark
        inner join student on student.studentid = mark.studentid
        inner join subject on subject.subid = mark.subid
        where mark.studentid = $1
      `;
        const res = await (dbQuery(query, [id]));

        return res.rows;
    } catch (e) {
        throw new Error(e);
    }
}