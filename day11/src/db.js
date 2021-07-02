const {Client} = require('pg');
const client = new Client({
    user:"postgres",
    database:"postgres",
    host:"localhost",
    port:5432,
    password:"jj5171"
});

module.exports = client;