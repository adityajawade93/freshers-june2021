"use strict";
var Client = require('pg').Client;
var client = new Client({
    user: 'postgres',
    password: 'welcome@123',
    host: 'localhost',
    database: 'postgres',
    port: '5432'
});
client.connect()
    .then(function () {
    console.log("database connected successfully");
});
module.exports = client;
