import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "school",
});
export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
