const {Client}=require('pg');
const client=new Client({
   user:'postgres',
   password:'welcome@123',
   host:'localhost',
   database:'postgres',
   port:'5432'
});
client.connect()
.then(()=>{
    console.log("database connected successfully");
})

module.exports =client;