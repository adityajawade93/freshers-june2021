/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { query as dbQuery } from '../index';

const checkExistByUniqueKeys = async function (table: string, keys: string[], values: any[]) {
  try {
    let whereCondition = 'WHERE';
    for (let index = 0; index < keys.length; index += 1) {
      whereCondition += ` ${keys[index]} = $${index + 1} AND`;
    }
    whereCondition = whereCondition.slice(0, -4);
    const query = `SELECT EXISTS(SELECT 1 FROM ${table} ${whereCondition})`;
    const result = await dbQuery(query, values);
    return result && result.rows && result.rows.length > 0 && result.rows[0].exists;
  } catch (e) {
    throw Error(e);
  }
};

export default checkExistByUniqueKeys;
