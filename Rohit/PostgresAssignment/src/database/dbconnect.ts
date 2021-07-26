import { Client } from "pg";
import { config } from "../config/config";

const client = new Client({
  user: config.dbUser,
  password: config.dbPassword,
  host: config.dbHost,
  database: config.dbName,
  port: config.dbPort,
});

client.connect()
.then(() =>{
console.log('connected successfully')
});

module.exports = client;
