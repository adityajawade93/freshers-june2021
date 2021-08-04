import { Pool } from 'pg';
import { config } from '../config/config';

export let pool: Pool;

export const dbStart = async function (): Promise<void> {

    const user = config.dbUser;
    const password = config.dbPassword;
    const host = config.dbHost;
    const port = config.dbPort;
    const database = 'postgres';
    const max = 10;
    pool = new Pool({ user, password, host, port, database, max });
};


export async function dbDisConnect(): Promise<void> {
    await pool.end();
}

export const dbQuery = async function (query: string, data: any[] = []): Promise<any> {
    try {
        return pool.query(query, data);
    } catch (e) {
        throw Error(e);
    }

};
