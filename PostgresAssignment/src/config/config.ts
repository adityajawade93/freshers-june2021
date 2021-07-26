const dotenv = require("dotenv");
const joi = require("joi");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../../.env") });

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

if (error) {
	throw new Error(`Config Validation Error : ${error}`);
}

module.exports = {
	dbName: process.env.db_name,
	dbPort: envVars.db_Port,
	dbUser: envVars.db_user,
	dbHost: envVars.db_host,
	dbPassword: envVars.db_pass,
};
