//const {client} = require('../database/pg_client.ts');
import client from '../database/pg_client';

async function getTeacherList(){
  const text = 'SELECT * from SchoolSchema.teachers ORDER BY teacher_id asc';
  const res = await client.query(text);
  console.log(res.rows);
  return res.rows;
};

async function addTeacherToList(teacher_id: number, teacher_name: string, teacher_dob: Date, teacher_address: string, gender: string, phone: number){
  
  const text = 'INSERT INTO SchoolSchema.teachers (teacher_id, teacher_name, teacher_dob, teacher_address, teacher_gender, teacher_phone) VALUES ($1,$2,$3,$4,$5,$6)';
  const value = [teacher_id,teacher_name,teacher_dob,teacher_address,gender,phone];
  const res = await client.query(text,value);
  return res.rows;
};

async function updateTeacherInList(teacher_id: number, teacher_name: string, teacher_dob: Date, teacher_address: string, gender: string, phone: number){
  
  const text = 'UPDATE SchoolSchema.teachers SET teacher_name = $2, teacher_dob = $3, teacher_address = $4, teacher_gender = $5, teacher_phone = $6 WHERE teacher_id = $1';
  const value = [teacher_id,teacher_name,teacher_dob,teacher_address,gender,phone];
  const res = await client.query(text,value);
  console.log(res);
  return res.rows;
};

module.exports = {getTeacherList, addTeacherToList, updateTeacherInList};
