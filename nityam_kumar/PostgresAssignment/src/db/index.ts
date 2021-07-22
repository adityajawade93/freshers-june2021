import { Pool } from "pg";
import { config } from "../config/config";

let pool: Pool;

export let connectDb = async function () {
  try {
    console.log(config.dbPassword);
    pool = new Pool({
      user: config.dbUser,
      password: config.dbPassword,
      host: config.dbHost,
      database: process.env.DB_DATABASE,
      port: config.dbPort,
    });

    const client = await pool.connect();
    if (client) {
      // console.log(client);
    }
  } catch (err) {
    console.log(err.message, err.stack);
    throw err;
  }
};

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
