//const {client} = require('database/pg_client.ts');
import client from '../database/pg_client';

export async function getClassList(){
  
  const text = 'SELECT DISTINCT class_id, subject_id from SchoolSchema.results';
  const res = await client.query(text);
  return res.rows;
};

export async function addStudentToClassList(student_id: number, class_id: number){
  
  const text = 'INSERT INTO SchoolSchema.student_class (student_id, class_id) VALUES ($1,$2)';
  const value = [student_id, class_id];
  const res = await client.query(text,value);
  return res;
};

export async function getStudentsByClass(class_id: number){
  
  const text = `SELECT student_id FROM SchoolSchema.student_class WHERE class_id = ${class_id}`;
  const res = await client.query(text);
  return res.rows;
};
