// const { Pool } = require('pg');

import { Pool } from 'pg';

// const dotenv = require('dotenv');
// dotenv.config();

const pool = new Pool({
  connectionString: 'postgres://postgres:postgres@localhost:5432/postgres'
});

pool.on('connect', () => {
  console.log('Database Connected Successfully !!!');
  // const response = await pool.query('SELECT * FROM school.student LIMIT = 1 OFFSET = 2', [2,2]);
  // console.log(response);
});

// module.exports = {
//   pool
//   // query: (text: any, params: any) => pool.query(text, params)
// };

export default pool;
