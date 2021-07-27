import { Pool } from "pg";
import { config } from "../config/config";

let pool: Pool;

(async function () {
  try {
    pool = new Pool({
      user: config.dbUser,
      password: config.dbPassword,
      host: config.dbHost,
      database: process.env.DB_DATABASE,
      port: config.dbPort,
    });

    const client = await pool.connect();
    if (client) {
      console.log("database connection successful");
    }
    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });
  } catch (err) {
    console.log("DB connection failed!!", err.stack, err.message);
  }
})();

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  query: (text: string, params?: any[]) => pool.query(text, params),
};
