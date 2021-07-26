import dotenv from "dotenv";
import Joi from "joi";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema = Joi.object({
  port: Joi.number().positive().required(),
  user: Joi.string().required(),
  host: Joi.string().required(),
  name: Joi.string().required(),
  pass: Joi.string().required().description('password to the database'),
}).unknown();

const { value: envVars } = envVarsSchema.validate(process.env);

if (envVars.error) {
  throw new Error(`Config Validation Error`);
}

export const config = {
  dbPort: envVars.port,
  dbUser: envVars.user, 
  dbHost: envVars.host,
  dbPassword: envVars.pass,
  dbName: envVars.name,
};
