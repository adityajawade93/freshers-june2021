const {Client} = require('pg');
const client = new Client({
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432,
  database: "schoolDB"
})

client.connect()
.then(() => console.log("successfully connected to database"));

module.exports = client;