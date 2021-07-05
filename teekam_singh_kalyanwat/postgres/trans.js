const { Client } = require('pg');
const connectionString = 'postgressql://postgres:postgres@localhost:5432/practice';
const client = new Client({
    connectionString: connectionString
})

execute();

async function execute() {
    try {
        await client.connect()
        await client.query("BEGIN")
        await client.query("insert into college.student values ('seb', '5')")
        console.log('inserted')
        await client.query("COMMIT")
    }
    catch (error) {
        console.log(error)
        await client.query("ROLLBACK")
    }
    finally {
        await client.end()
        console.log('disconnected.')
    }

}