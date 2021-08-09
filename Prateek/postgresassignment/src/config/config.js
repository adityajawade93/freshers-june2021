"use strict";
exports.__esModule = true;
exports.config = void 0;
var dotenv = require('dotenv');
var joi = require('joi');
var path = require('path');
dotenv.config({ path: path.join(__dirname, '../../.env') });
var envVarsSchema = joi.object({
    db_Port: joi.number().positive().required(),
    db_user: joi.string().required(),
    db_host: joi.string().required(),
    db_pass: joi.string().required().description('password to the database')
})
    .unknown();
var _a = envVarsSchema.validate(process.env), envVars = _a.value, error = _a.error;
if (envVars.error) {
    throw new Error("Config Validation Error");
}
;
exports.config = {
    dbPort: envVars.db_Port,
    dbUser: envVars.db_user,
    dbHost: envVars.db_host,
    dbPassword: envVars.db_pass
};
