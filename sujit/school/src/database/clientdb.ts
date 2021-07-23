const { Pool } = require("pg")
const config = require("../config/config")

export const pool = new Pool({
    user: config.dbUser,
    database: config.dbName,
    host: config.dbHost,
    port: config.dbPort,
    password: config.dbPassword,
    max: 20,
    connectionTimeoutMillsis: 0,
    idleTimeoutMillsis: 0
})


// FIXME: pass the data from config file
export async function setPath() {
    try {
        await pool.query('set search_path to school')
    } catch (er) {
        throw new Error(er)
    }

}

// FIXME : https://www.npmjs.com/package/pg-pool event error
export async function query(querystring: string) {
    try {
        var result = await pool.query(querystring)
        return result
    } catch (er) {
        throw new Error(er);
    }

}

//module.exports = {query,setpath}