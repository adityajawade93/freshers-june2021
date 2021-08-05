const {client} = require('../database/pg_client');

export async function getTeacherList(){
  try{
    const text = 'SELECT * from teachers';
    const res = await client.query(text);
    return res;
  }
  catch(err) {
    console.log(err.stack);
  }
};

export async function addTeacherToList(teacher_id: number, teacher_name: string, teacher_dob: Date, teacher_address: string, gender: string, phone: string){
  try{
    const text = 'INSERT INTO teachers (teacher_id, teacher_name, teacher_dob, teacher_address,gender, phone) VALUES ($1,$2,$3,$4,$5,$6)';
    const value = [teacher_id,teacher_name,teacher_dob,teacher_address,gender,phone];
    const res = await client.query(text,value);
    return res;
  }
  catch(err) {
    console.log(err.stack);
  } 
};

export async function updateTeacherInList(teacher_id: number, teacher_name: string, teacher_dob: Date, teacher_address: string, gender: string, phone: string){
  try{
    const text = 'UPDATE teachers SET teacher_name = $2, teacher_dob = $3, teacher_address = $4, gender = $5, phone = $6 WHERE teacher_id = $1';
    const value = [teacher_id,teacher_name,teacher_dob,teacher_address,gender,phone];
    const res = await client.query(text,value);
    return res;
  }
  catch(err) {
    console.log(err.stack);
  }
};
