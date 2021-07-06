var Client = require('pg').Client;
var client = new Client({
    user: "postgres",
    password: "postgres",
    port: 3376,
    host: "localhost",
    database: "employees",
    schema: "myschool"
});
client.connect()
    .then(function () {
    console.log('connected successfully');
});
module.exports = client;
