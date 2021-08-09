"use strict";
exports.__esModule = true;
exports.client = void 0;
var Client = require("pg").Client;
var config = require('../config/config.ts');
var client = new Client({
    user: config.dbUser,
    password: config.dbPassword,
    host: config.dbHost,
    database: process.env.db_name,
    port: config.dbPort
});
exports.client = client;
