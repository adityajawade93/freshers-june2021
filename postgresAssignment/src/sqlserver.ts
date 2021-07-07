const pg = require('pg');
 const client = new pg.Client({
   
    user : "postgres",
    password : "password",
    host  : "localhost",
    port : 5432,
    database : "student"
     
 });

 client.connect()
 .then(()=>{
  console.log("DB connected successfully");

 })

 module.exports = client;