const {Client}=require('pg');
const client=new Client({
   user:'postgres',
   password:'pass@123',
   host:'localhost',
   database:'postgres',
   port:'5432'
});

client.connect()
.then(()=>{
   console.log('connected successfully')
})

module.exports =client;