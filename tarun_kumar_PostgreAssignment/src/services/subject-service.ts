import { dbQuery } from "../db/db";

export async function addSubject(subid: string, subname: string): Promise<boolean> {
    try {
        const query = 'insert into subject (subid, subname) values ($1, $2)';
        const res = await (dbQuery(query, [subid, subname]));

        if (res && res.command === 'INSERT')
            return true;

        return false;

    } catch (e) {
        throw new Error(e.message);
    }
}

export async function getSubjects(): Promise<Array<string>> {
    try {
        const query = 'select * from subject';
        const res = await (dbQuery(query));

        return res.rows;
    } catch (e) {
        throw new Error(e.message);
    }
}

export async function getSubjectId(subname: string): Promise<string> {
    try {
        const query = 'select id from subject where subname = $1';
        const res = await (dbQuery(query, [subname]));

        return res.rows[0].id;
    } catch (e) {
        throw new Error(e.message);
    }
}
