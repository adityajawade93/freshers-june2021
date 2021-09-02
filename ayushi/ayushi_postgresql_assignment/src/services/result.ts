//const {client} = require('database/pg_client.ts');
import client from '../database/pg_client';

export async function subjectMarksByStudent(student_id:number){
  
  const text = `SELECT subject_id, marks FROM SchoolSchema.results WHERE student_id = ${student_id}`;
  const response = await client.query(text);
  console.log(response.rows[0]);
  return response.rows[0];
};

export async function topStudentWithSubject(class_id: number){

  const text = `SELECT * FROM SchoolSchema.results WHERE class_id = ${class_id} ORDER BY marks desc`;
  const response = await client.query(text);
  console.log(response);
  if(response.rows.length == 0){
    return [];
  }
  const mark = response.rows[0].marks;
  let len = response.rows.length;
  let i=1;
  let num=0;
  while(i<len){
    if(response.rows[i].marks == mark){
      num++;
      i++;
    }
    else{
      break;
    }
  }

  console.log(response.rows.slice(0,num+1));
  return response.rows.slice(0,num+1);
};

export async function topScoreStudents(){
  
  const text = 'SELECT student_id, SUM(marks) AS marks FROM SchoolSchema.results GROUP BY student_id ORDER BY marks desc LIMIT 10';
  const response = await client.query(text);
  console.log(response.rows);
  return response.rows;
};
