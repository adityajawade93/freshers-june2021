import {client as sqlclient} from '../database/db';

export async function get_subject(){
    try{
    await sqlclient.query("SET search_path TO College");
          return (await sqlclient.query("SELECT * FROM subject")); 
    }catch(e){
        throw Error(e);
    }
}

export async function get_student_by_subjectid(id:number){
    try{
    await sqlclient.query("SET search_path TO College");
          return (await sqlclient.query(`SELECT S.student_id,S.fname FROM Student AS S,class_student,class_schedule WHERE subj_id=${id} AND class_id=classid AND studid=student_id`)); 
    }catch(e){
        throw Error(e);
    }
}

export async function add_subject(subject_id:number,subject_name:string){
    try{
    await sqlclient.query("SET search_path TO College");
    const data = [subject_id,subject_name];
          return (await sqlclient.query("INSERT INTO Subject values($1,$2)",data)); 
    }catch(e){
        throw Error(e);
    }
}

export async function get_subjectmarks_by_subjectid(id:number){
    try{
    await sqlclient.query("SET search_path TO College");
          return (await sqlclient.query(`SELECT subject_id,subject_name,marks FROM result,subject WHERE studentid=${id} AND subjectid=subject_id`)); 
    }catch(e){
        throw Error(e);
    }
}