const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  password: "postgres",
  port: 3376,
  host: "localhost",
  database: "employees",
  schema:"school",
});

client.connect()
.then(() => {
  console.log("connected successfully");
});

module.exports = client;
