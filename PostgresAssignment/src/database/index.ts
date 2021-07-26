const { Pool } = require("pg");
const config = require("../config/config");

const pool = new Pool({
	user: config.dbUser,
	password: config.dbPassword,
	host: config.dbHost,
	database: config.dbName,
	max: 20,
	connectionTimeoutMillsis: 0,
	idleTimeoutMillsis: 0,
});

export async function query(querystring: string) {
	try {
		let result = await pool.query(querystring);
		return result;
	} catch (e) {
		throw new Error(e);
	}
}
