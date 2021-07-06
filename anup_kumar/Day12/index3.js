const {Client}=require('pg');
const client=new Client({
    user:'postgres',
    password:'1234',
    host:'localhost',
    port:5431,
    database:'student'
})

execute();
async function execute(){
    try{

    await client.connect()
    console.log("connected Succesfully.");
    client.query("set search_path to students");
    client.query("set search_path to studentinformation");
    const result=await client.query("select * from temp");
    console.table(result.rows);
    await client.end()
    console.log("disconnected successfully");
    }
    catch(ex){
        console.log(`something gone wrong ${ex}`);
    }
}
