const {client} = require('../database/pg_client');

export async function getSubjectList(){
  try{
    const text = 'SELECT * from subjects';
    const res = await client.query(text);
    return res;
  }
  catch(err) {
    console.log(err.stack);
  }
};

export async function addSubjectToList(subject_id: number, subject_name: string){
  try{
    const text = 'INSERT INTO subjects (subject_id, subject_name) VALUES ($1,$2)';
    const value = [subject_id,subject_name];
    const res = await client.query(text,value);
    return res;
  }
  catch(err) {
    console.log(err.stack);
  } 
};

export async function updateSubjectInList(subject_id: number, subject_name: string) {
  try{
    const text = 'UPDATE subjects SET subject_name = $2 WHERE subject_id = $1';
    const value = [subject_id,subject_name];
    const res = await client.query(text,value);
    return res;
  }
  catch(err) {
    console.log(err.stack);
  }
};
