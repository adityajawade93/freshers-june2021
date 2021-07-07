import {client as sqlclient} from '../database/db';

export async function get_class(){
    try{
    await sqlclient.query("SET search_path TO College");
          return (await sqlclient.query("SELECT * FROM Class_schedule")); 
    }catch(e){
        throw Error(e);
    }
}

export async function get_student_by_classid(id:number){
    try{
    await sqlclient.query("SET search_path TO College");
          return (await sqlclient.query(`SELECT S.student_id,S.fname FROM Student AS S,class_student WHERE class_id=${id} AND studid=student_id`)); 
    }catch(e){
        throw Error(e);
    }
}

export async function add_student_in_class(class_id:number,studid:number){
    try{
    await sqlclient.query("SET search_path TO College");
    const data = [class_id,studid];
          return (await sqlclient.query("INSERT INTO class_student values($1,$2)",data)); 
    }catch(e){
        throw Error(e);
    }
}