import { Client } from "pg";
// tslint:disable-next-line:no-var-requires
const config = require('../config/config');

// const ConnectionString: string = `postgressql://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

 const client = new Client({
    user: config.dbUser,
    database: config.dbName,
    host: config.dbHost,
    port: config.dbPort,
    password: config.dbPassword,
  });

export function start() {
    try {
        client.connect();
    } catch (er) {
        throw new Error(er)
    }
}

export function setpath() {
    try {
        client.query('set search_path to school')
    } catch (er) {
        throw new Error(er)
    }
}

export function disconnect() {
    try{
        client.end();
    } catch(er){
        throw new Error(er);
    }
}

export async function query(querystring: string, values: any[] = []) {
    return await client.query(querystring, values)
}