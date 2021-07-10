import { dbQuery } from "../db/db";

export async function addSubject(subid: string, subname: string) {
    try {
        const query = 'insert into subject (subid, subname) values ($1, $2)';
        const res = await (dbQuery(query, [subid, subname]));

    } catch (e) {
        throw new Error(e.message);
    }
}

export async function getSubjects() {
    try {
        const query = 'select * from subject';
        const res = await (dbQuery(query));

        return res.rows;
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function getSubjectId(subname: string) {
    try {
        const query = 'select id from subject where subname = $1';
        const res = await (dbQuery(query, [subname]));

        return res.rows[0].id;
    } catch (e) {
        throw new Error(e.message);
    }
}
