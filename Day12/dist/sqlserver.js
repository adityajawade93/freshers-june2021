"use strict";
var pg = require('pg');
var client = new pg.Client({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "student"
});
client.connect()
    .then(function () {
    console.log("DB connected successfully");
});
module.exports = client;
