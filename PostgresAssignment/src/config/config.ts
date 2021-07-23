const dotenv = require("dotenv");
const joi = require("joi");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../../.env") });

console.log(process.env.db_name, typeof process.env.db_name);
const envVarsSchema = joi
	.object({
		db_Port: joi
			.number()
			.positive()
			.required(),
		db_user: joi.string().required(),
		db_host: joi.string().required(),
		db_pass: joi
			.string()
			.required()
			.description("password to the database"),
	})
	.unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (envVars.error) {
	throw new Error(`Config Validation Error`);
}

export const dbName = process.env.db_name;
export const dbPort = envVars.db_Port;
export const dbUser = envVars.db_user;
export const dbHost = envVars.db_host;
export const dbPassword = envVars.db_pass;
