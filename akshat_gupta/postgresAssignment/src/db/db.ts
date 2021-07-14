import { Pool } from 'pg';

const client = new Pool({
	user: 'postgres',
	database: 'postgres',
	host: 'localhost',
	port: 5432,
	password: 'akshatg05',
});

module.exports = client;
