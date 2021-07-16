import { Client } from "pg";

const ConnectionString: string = 'postgressql://postgres:postgres@localhost:5432/practice';

let client: any;
export async function start() {
    client = new Client({ connectionString: ConnectionString });
    await client.connect();

}

export async function setpath(){
    try{
        await client.query('set search_path to school')
    }catch(er){
        throw new Error(er)
    }
}

export async function query(querystring:string, values: any[] = []){
    try{
        const result = await client.query(querystring, values)
        return result
    }catch(er){
        throw new Error(er);
    }
}