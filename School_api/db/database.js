var Client = require('pg').Client;
var client = new Client({
    user: 'postgres',
    password: 'pass@123',
    host: 'localhost',
    database: 'postgres',
    port: '5432'
});
client.connect()
    .then(function () {
    console.log('connected successfully');
});
module.exports = client;
