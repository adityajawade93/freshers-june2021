import { Pool } from "pg";
import { config } from "../config/config";

let pool: Pool;

export async function pgConnect() {
  try {
    pool = new Pool({
      user: config.DBUser,
      password: config.DBPassword,
      host: config.DBHost,
      database: process.env.DBDATABASE,
      port: config.DBPort,
    });

    const client = await pool.connect();
    if (client) {
      console.log("database connection successful");
      client.release();
    }
    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });
  } catch (err) {
    console.log("DB connection failed!!", err.stack, err.message);
  }
}

export async function pgDisConnect() {
  await pool.end(() => {});
}

export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  query: (text: string, params?: any[]) => pool.query(text, params),
};
