import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "school",
});

// console.log(pool);
export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
