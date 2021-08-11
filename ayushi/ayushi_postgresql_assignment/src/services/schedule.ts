import client from '../database/pg_client';

export async function addSchedule(class_id:number, subject_id: number, teacher_id: number){
    
    const text = 'INSERT INTO SchoolSchema.schedule VALUES($1,$2,$3)';
    const value = [class_id, subject_id, teacher_id];
    const response = await client.query(text, value);
    return response.rows[0];
  };

export async function classByTeacher(teacher_id: number){
  
  const text = `SELECT class_id FROM SchoolSchema.schedule WHERE teacher_id = ${teacher_id}`;
  const response = await client.query(text);
  console.log(response.rows[0]);
  return response.rows[0];
};

export async function studentByClass(class_id: number){
  
  const text = `SELECT student_id FROM SchoolSchema.student_class WHERE class_id = ${class_id} ORDER BY student_id asc`;
  const response = await client.query(text);
  console.log(response.rows);
  return response.rows;
};

export async function classBySubject(subject_id: number){
  
  const text = `SELECT class_id FROM SchoolSchema.schedule WHERE subject_id = ${subject_id}`;
  const response = await client.query(text);
  console.log(response.rows[0]);
  return response.rows[0];
};
