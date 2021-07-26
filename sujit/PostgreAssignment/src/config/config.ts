import dotenv from 'dotenv';
import joi from 'joi';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });


const envVarsSchema = joi.object({
    PORT: joi.number().positive().required(),
    USER: joi.string().required(),
    HOST: joi.string().required(),
    NAME: joi.string().required(),
    PASS: joi.string().required(),
  })
  .unknown();

  const { value: envVars, error } = envVarsSchema.validate(process.env);
  if(error)
  {
    throw new Error("error"+error);
  };

  module.exports = {
    dbPort: envVars.PORT,
    dbUser: envVars.USER,
    dbHost: envVars.HOST,
    dbPassword: envVars.PASS,
    dbName: envVars.NAME,
  };


