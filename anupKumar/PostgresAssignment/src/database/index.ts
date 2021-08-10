const { Pool } = require("pg");
const config = require("../config/config");
// console.log(config.dbPassword);
// config.dbPassword = "123445";
// console.log(config.dbPassword);
const pool = new Pool({
	user: config.dbUser,
	password: config.dbPassword,
	host: config.dbHost,
	database: config.dbName,
	max: 20,
	connectionTimeoutMillsis: 0,
	idleTimeoutMillsis: 0,
});

export async function query(querystring: string): Promise<any | never> {
	let result = await pool.query(querystring);
	return result;
}
