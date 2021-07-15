const { Pool } = require('pg');

require('dotenv').config();

const client = new Pool({
  user: process.env.DB_user,
  database: process.env.DB_name,
  host: process.env.DB_host,
  port: process.env.DB_port,
  password: process.env.DB_password,
});

module.exports = client;
