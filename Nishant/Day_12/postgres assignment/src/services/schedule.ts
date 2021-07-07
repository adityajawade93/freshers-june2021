import {client as sqlclient} from '../database/db';

export async function add_class_schedule(classid:number,classno:number,subj_id:number,subj_name:string,t_id:number,t_fname:string){
    try{
    await sqlclient.query("SET search_path TO College");
    const data = [classid,classno,subj_id,subj_name,t_id,t_fname];
          return (await sqlclient.query("INSERT ITO Class_schedule values($1,$2,$3,$4,$5,$6)",data)); 
    }catch(e){
        throw Error(e);
    }
}