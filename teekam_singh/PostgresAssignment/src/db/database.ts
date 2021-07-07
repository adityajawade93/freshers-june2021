import { Client } from "pg";

const connectionString: string = 'postgressql://postgres:postgres@localhost:5432/practice';

let client: any;
export async function start() {
    client = new Client({ connectionString: connectionString });
    await client.connect();

}

export async function setpath(){
    try{
        await client.query('set search_path to school')
    }catch(er){
        throw new Error(er)
    }   
}

export async function query(querystring:string){
    try{
        var result = await client.query(querystring)
        return result
    }catch(er){
        throw new Error(er);
    }    
}