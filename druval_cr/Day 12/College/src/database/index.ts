import { Pool } from 'pg';

let pool: Pool;
export const start = async function () {
  const user: string = 'postgres';
  const password: string = 'root';
  const host: string = 'localhost';
  const port: number = 5432;
  const database: string = 'postgres';
  const max: number = 10;
  pool = new Pool({ user, password, host, port, database, max });
}

export const setPath = async function () {
  return pool.query('set search_path to college;');
}

export const query = async function (query: string, data: any [] = []) {
  return pool.query(query, data);
}

export const checkExistByUniqueKeys = async function (table: string, keys: string [], values: any []) {
  let whereCondition: string = 'WHERE';
  for (let index: number = 0; index < keys.length; index += 1) {
    whereCondition += ` ${keys[index]} = $${index + 1} AND`;
  }
  whereCondition = whereCondition.slice(0, -4);
  const query = `SELECT EXISTS(SELECT 1 FROM ${table} ${whereCondition})`;
  console.log(query);
  console.log(values);
  const result = await pool.query(query, values);
  return (result && result.rows && result.rows.length > 0 && result.rows[0].exists);
}
