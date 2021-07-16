import { Pool } from 'pg';

const client: Pool = new Pool({
    user: "arnab",
    password: "1234",
    host: "127.0.0.1",
    port: 5432,
    database: "zopsmart"
});

export {client};
