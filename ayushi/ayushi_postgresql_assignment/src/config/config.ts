export{};
const dotenv = require('dotenv');
const Joi = require('joi');
const path = require('path');

dotenv.config({path: path.join(__dirname,'../../.env')});

const envVarSchema = Joi.object({
  DB_PORT: Joi.number().integer().positive().required(),
  DB_USER: Joi.string().alphanum().min(6).max(30).required(),
  DB_HOST: Joi.string().required(),
  DB_PASSWORD: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).description('password to the database')
}).unknown();

const {value:envVars, error} = envVarSchema.validate(process.env);
if(error){
  throw new Error(`Env variables config error ${error.message}`);
}

module.exports = envVars;
