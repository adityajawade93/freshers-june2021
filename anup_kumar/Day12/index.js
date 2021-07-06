const {Client}=require('pg');
const client =new Client({
    user:"postgres",
    password:'1234',
    host:"localhost",
    port:5432,
    database:'student'
})
client.connect()
.then(()=>console.log("connected succesfully"))
.then(()=>client.query("set search_path to students"))
.then(()=>client.query("show search_path"))
.then(()=>client.query("set search_path to studentinformation"))
.then(()=>client.query("show search_path"))
.then(results => console.table(results.rows)) //setting the search path 
.then(()=>client.query("SELECT datname FROM pg_database;"))
.then(results => console.table(results.rows))
.then(()=>client.query("insert into temp values ($1,$2)",[21,"anup"]))
.then(results=>console.table(results.rows))

.catch(e=>console.log(e)).finally(()=>client.end());
console.log("hello")