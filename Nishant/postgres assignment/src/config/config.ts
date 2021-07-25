import path from 'path';
import joi from 'joi';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = joi.object({
  DB_PORT: joi.number().positive().required(),
  DB_USER: joi.string().required(),
  DB_HOST: joi.string().required(),
  DB_PASSWORD: joi.string().required().description('password to the database'),
})
  .unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config Validation Error, ${error.message}`);
}

const config = {
  dbPort: envVars.DB_PORT,
  dbHost: envVars.DB_HOST,
  dbUser: envVars.DB_USER,
  dbPassword: envVars.DB_PASSWORD,
};
export default config;
