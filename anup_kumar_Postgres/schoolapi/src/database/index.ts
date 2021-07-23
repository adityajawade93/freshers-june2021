const { Pool } = require("pg");
const config = require("../config/config.ts");

const pool = new Pool({
	port: config.dbPort,
	user: config.dbUser,
	password: config.dbPassword,
	host: config.dbHost,
	database: process.env.db_name,
});

export async function query(querystring: string) {
	try {
		let result = await pool.query(querystring);
		return result;
	} catch (e) {
		throw new Error(e);
	}
}
