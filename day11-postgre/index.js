const { Client } = require('pg')
const client = new Client({
    user: "postgres",
    password: "tarun12",
    host: "localhost",
    port: 5432,
    database: "postgres"
})

execute()

async function execute() {
    try {

        await client.connect()
        console.log("Connected successfully.")
        //await client.query("insert into employees values (1, 'John')")


        await client.query("insert into student values ('68', 'rauhl', 'uk')")
        const { rows } = await client.query("select * from student")
        console.table(rows)

    }
    catch (ex) {
        console.log(`Something wrong happend ${ex}`)
    }
    finally {
        await client.end()
        console.log("Client disconnected successfully.")
    }

}