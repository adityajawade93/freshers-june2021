const { Client } = require("pg");
const config = require('../config/config.ts');

const client = new Client({
  user: config.dbUser,
  password: config.dbPassword,
  host: config.dbHost,
  database: process.env.db_name,
  port: config.dbPort,
});
client.connect().then(() => {
  console.log("database connected successfully");
});

export { client };
