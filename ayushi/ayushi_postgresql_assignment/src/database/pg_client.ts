const {Client} = require('pg');
const config = require('../config/config.ts');

const client = new Client({
  user: config.DB_USER,
  //user: "postgres",
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: process.env.DB_DATABASE
})

client.connect()
.then(() => console.log("successfully connected to database"));

export default client;
