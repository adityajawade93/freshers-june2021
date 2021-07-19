const joi = require('joi');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = joi.object({
  DB_PORT: joi.number().positive().required(),
  DB_user: joi.string().required(),
  DB_host: joi.string().required(),
  DB_password: joi.string().required().description('password to the database'),
})
  .unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config Validation Error, ${error.message}`);
}

module.exports = {
  dbPort: envVars.DB_PORT,
  dbHost: envVars.DB_host,
  dbUser: envVars.DB_user,
  dbPassword: envVars.DB_password,
};
