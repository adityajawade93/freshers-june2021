import {client as sqlclient} from '../database/db';

export async function get_student(){
      try{
    await sqlclient.query("SET search_path TO College");
          return (await sqlclient.query("SELECT * FROM Student")); 
      }catch(e){
            throw Error(e);
      }
        }


export async function get_student_length(){
      try{
            await sqlclient.query("SET search_path TO College");
                  return (await sqlclient.query("SELECT Count(*) FROM Student")); 
         }catch(e){
               throw Error(e);
         }
        }

export async function add_student(student_id:number,fname:string,mname:string,lname:string,dob:string,gender:string,address:string){
      try{      
      await sqlclient.query("SET search_path TO College");
            const data = [student_id,fname,mname,lname,dob,gender,address];
                  return (await sqlclient.query("INSERT INTO Student values($1,$2,$3,$4,$5,$6,$7)",data)); 
      }catch(e){
            throw Error(e);
      }
        }