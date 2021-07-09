const {Pool} = require('pg');
const client = new Pool({
    user:"postgres",
    database:"postgres",
    host:"localhost",
    port:5432,
    password:"myPassword"
});

// client.connect()
// .then(()=>{
//     console.log('db connected successfully ')
// })

module.exports = client;