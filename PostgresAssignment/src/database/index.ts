const { Pool } = require("pg");
import { dbName, dbHost, dbPort, dbPassword, dbUser } from "../config/config";

const pool = new Pool({
	port: 5432,
	user: dbUser,
	password: dbPassword,
	host: dbHost,
	database: dbName,
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
