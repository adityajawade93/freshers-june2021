import { Pool } from 'pg';

export let pool: Pool;

export const dbStart = async function () {
    const user = 'postgres';
    const password = 'tarun12';
    const host = 'localhost';
    const port = 5432;
    const database = 'postgres';
    const max = 10;
    pool = new Pool({ user, password, host, port, database, max });
};


export const dbQuery = async function (query: string, data: any[] = []) {
    try {
        return pool.query(query, data);
    } catch (e) {
        throw Error(e);
    }

};