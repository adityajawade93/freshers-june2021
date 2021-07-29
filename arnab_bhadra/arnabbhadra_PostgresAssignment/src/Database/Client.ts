import { Pool } from 'pg';
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, './../../.env') });

const client: Pool = new Pool({
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    database: process.env.DATABASE
});

export {client};
