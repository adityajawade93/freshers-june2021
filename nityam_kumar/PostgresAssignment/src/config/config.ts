import joi from "joi";

const envVarsSchema = joi
  .object({
    DB_PORT: joi.number().positive().required(),
    DB_USER: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PASSWORD: joi
      .string()
      .required()
      .description("password to the database"),
    PORT: joi.number().positive().required(),
  })
  .unknown();

const { value: envVars } = envVarsSchema.validate(process.env);

if (envVars.error) {
  throw new Error("Config Validation Error");
}

export const config = {
  DBPort: envVars.DBPORT,
  DBUser: envVars.DBUSER,
  DBHost: envVars.DBHOST,
  DBPassword: envVars.DBPASSWORD,
  Port: envVars.PORT,
};
