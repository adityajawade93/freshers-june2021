import { dbQuery } from "../db/db";

export async function addSubject(subid: string, subname: string): Promise<boolean> {
    try {
        const query = 'insert into subject (subid, subname) values ($1, $2)';
        const res = await (dbQuery(query, [subid, subname]));

        if (res && res.command === 'INSERT')
            return true;
        else
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

export async function getSubjectByName(subname: string): Promise<string> {
    try {
        const query = 'select * from subject where subname = $1';
        const res = await (dbQuery(query, [subname]));
        if (res.rowCount == 0) {
            return "give correct name. This name dosent exist";
        }
        return res.rows;
    } catch (e) {
        throw new Error(e.message);
    }
}
