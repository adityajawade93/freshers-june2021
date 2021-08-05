import dotenv from 'dotenv';
import joi from 'joi';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = joi.object({
    db_Port: joi.number().positive().required(),
    db_user: joi.required(),
    db_host: joi.required(),
    db_pass: joi.required().description('password to the database'),
})
    .unknown();

const { value: envVars } = envVarsSchema.validate(process.env);

if (envVars.error) {
    throw new Error(`Config Validation Error`);
}

export const config = {
    dbPort: envVars.db_Port,
    dbUser: envVars.db_user,
    dbHost: envVars.db_host,
    dbPassword: envVars.db_pass,
    port: 3001,
};
