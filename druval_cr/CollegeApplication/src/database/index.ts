/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool } from 'pg';

export let pool: Pool;

export const start = async function () {
  const user = 'postgres';
  const password = 'root';
  const host = 'localhost';
  const port = 5432;
  const database = 'postgres';
  const max = 10;
  pool = new Pool({ user, password, host, port, database, max });
};

export const setPath = async function () {
  return pool.query('set search_path to college;');
};

export const query = async function (query: string, data: any[] = []) {
  return pool.query(query, data);
};
