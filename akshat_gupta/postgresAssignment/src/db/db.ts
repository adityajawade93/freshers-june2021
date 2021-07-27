import { Pool } from 'pg';

export const client = new Pool({
	user: 'postgres',
	database: 'postgres',
	host: 'localhost',
	port: 5432,
	password: 'akshatg05',
});
