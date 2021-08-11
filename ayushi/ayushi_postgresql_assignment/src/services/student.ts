//const {client} = require('../database/pg_client.ts');
import client from '../database/pg_client';

async function getStudentList(){
  const response = await client.query('SELECT * FROM SchoolSchema.students');
  console.log(response.rows);
  return response.rows;
};

async function getStudentInfoByStudentId(student_id: number){
  const response = await client.query(`SELECT * FROM SchoolSchema.students WHERE student_id = ${student_id}`);
  //console.log(response.rows[0]);
  return response.rows[0];
};

async function getStudentListByStudentId(...arr:any) {
  console.log(arr);
  console.log(arr[0]);
  console.log(arr.length);
  //console.log(arr[0][0]);

  let params = [];
  for (let i = 1; i <= arr[0].length; i++) {
    console.log(i);
    params.push(`$${i}`);
  }
  console.log(params);
  const response = await client.query(`SELECT student_name FROM SchoolSchema.students WHERE student_id IN ( ${params.join(',')} )`, arr[0]);
  console.log(response);
  return response.rows;
};

async function addStudentToList(student_id:number, student_name: string, 
student_dob: Date, student_address: string,gender: string, phone: number){
  try{
    const text = 'INSERT INTO SchoolSchema.students VALUES($1,$2,$3,$4,$5,$6)';
    const value = [student_id, student_name, student_dob, student_address, gender, phone];
    const response = await client.query(text, value);
    return response.rows[0];
  }
  catch (err) {
    console.log(err.stack);
  }
};

async function updateStudentToList(student_id:number, student_name: string,
  student_dob: Date, student_address: object, gender:string, phone:number){
    
    const text = 'UPDATE SchoolSchema.students SET student_name = $2,student_dob = $3,student_address = $4, student_gender = $5, student_phone = $6 WHERE student_id = $1';
    const value = [student_id,student_name, student_dob, student_address, gender, phone];
    const response = await client.query(text,value);
    return response.rows[0];
};

module.exports = {getStudentList,getStudentInfoByStudentId,getStudentListByStudentId,addStudentToList,updateStudentToList};
