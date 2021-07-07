const { Pool } = require('pg')

const pool = new Pool({
    port:5432,
    user:'postgres',
    password:'1234',
    host:'localhost',
    database:'schooldb',
    max:20,
    connectionTimeoutMillsis:0,
    idleTimeoutMillsis:0

})
export async function setpath(){
    try{
        await pool.query('set search_path to school')
    }catch(er){
        throw new Error(er)
    }
    
}


export async function query(querystring:string){
    try{
        var result = await pool.query(querystring)
        return result
    }catch(er){
        throw new Error(er);
    }
    
}