const { Pool } = require('pg');

const config = require('./config/config.ts');

const client = new Pool({
  user: config.dbUser,
  database: process.env.DB_name,
  host: config.dbHost,
  port: config.dbPort,
  password: config.dbPassword,
});

module.exports = client;
