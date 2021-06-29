/* eslint-disable no-console */

const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
});

async function execute() {
  try {
    await client.connect();
    console.log('Connected');
    await client.query('set search_path to company;');
    const results = await client.query('select * from employee where fname like $1', ['J%']);
    console.table(results.rows);
  } catch (e) {
    console.log('Error: ', e);
  } finally {
    await client.end();
    console.log('Disconnected');
  }
}

execute();
