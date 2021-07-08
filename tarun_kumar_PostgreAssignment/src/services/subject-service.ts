import { dbQuery } from "../db/db";

export async function addSubject(id: string, name: string) {
    try {
        const query = 'insert into subject (id, name) values ($1, $2)';
        const res = await (dbQuery(query, [id, name]));

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

export async function getSubjectId(name: string) {
    try {
        const query = 'select id from subject where name = $1';
        const res = await (dbQuery(query, [name]));

        return res.rows[0].id;
    } catch (e) {
        throw new Error(e.message);
    }
}
