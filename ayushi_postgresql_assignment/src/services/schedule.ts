const {client} = require('../database/pg_client');

export async function addSchedule(class_id:number, subject_id: number, teacher_id: number){
    try{
      const text = 'INSERT INTO schedule VALUES($1,$2,$3)';
      const value = [class_id, subject_id, teacher_id];
      const response = await client.query(text, value);
      return response.rows[0];
    }
    catch (err) {
      console.log(err.stack);
    }
  };

export async function classByTeacher(teacher_id: number){
  try{
    const text = 'SELECT class_id FROM schedule WHERE teacher_id = $1';
    const response = await client.query(text, teacher_id);
    return response;
  }
  catch (err) {
    console.log(err.stack);
  }
};

export async function studentByClass(class_id: number){
  try{
    const text = 'SELECT student_id FROM student_class WHERE class_id = $1';
    const response = await client.query(text, class_id);
    return response;
  }
  catch (err) {
    console.log(err.stack);
  }
};

export async function classBySubject(subject_id: number){
  try{
    const text = 'SELECT class_id FROM schedule WHERE subject_id = $1';
    const response = await client.query(text, subject_id);
    return response;
  }
  catch (err) {
    console.log(err.stack);
  }
};
