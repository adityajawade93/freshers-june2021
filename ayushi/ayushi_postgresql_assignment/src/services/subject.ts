//const {client} = require('../database/pg_client.ts');
import client from '../database/pg_client';

async function getSubjectList(){
  const text = 'SELECT * from SchoolSchema.subjects ORDER BY subject_id asc';
  const res = await client.query(text);
  return res.rows;
};

async function addSubjectToList(subject_id: number, subject_name: string){
  
  const text = 'INSERT INTO SchoolSchema.subjects (subject_id, subject_name) VALUES ($1,$2)';
  const value = [subject_id,subject_name];
  const res = await client.query(text,value);
  return res;
};

async function updateSubjectInList(subject_id: number, subject_name: string) {
  
  const text = 'UPDATE SchoolSchema.subjects SET subject_name = $2 WHERE subject_id = $1';
  const value = [subject_id,subject_name];
  const res = await client.query(text,value);
  return res;
};

module.exports = {getSubjectList, addSubjectToList, updateSubjectInList};
