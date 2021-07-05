const {Client} = require('pg');
const connectionString = 'postgressql://postgres:postgres@localhost:5432/practice';
const client = new Client({
    connectionString: connectionString
})


client.connect()
.then(() => console.log("connected..."))
.then(() => client.query("insert into college.student values ($1, $2)", ['kim' , '1005']))
.then(() => client.query("select * from college.student"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())
