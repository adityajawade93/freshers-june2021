/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { pool } from '../index';

const checkExistByUniqueKeys = async function (table: string, keys: string[], values: any[]) {
  let whereCondition = 'WHERE';
  for (let index = 0; index < keys.length; index += 1) {
    whereCondition += ` ${keys[index]} = $${index + 1} AND`;
  }
  whereCondition = whereCondition.slice(0, -4);
  const query = `SELECT EXISTS(SELECT 1 FROM ${table} ${whereCondition})`;
  const result = await pool.query(query, values);
  return result && result.rows && result.rows.length > 0 && result.rows[0].exists;
};

export default checkExistByUniqueKeys;
