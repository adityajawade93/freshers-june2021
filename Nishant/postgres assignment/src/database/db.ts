import { Client } from 'pg';
import config from '../config/config';

const client = new Client({
  user: config.dbUser,
  database: 'postgres',
  host: config.dbHost,
  port: config.dbPort,
  password: config.dbPassword,
});
client.connect()
  .then(() => {
    console.log('database connected successfully');
  });

export default client;
