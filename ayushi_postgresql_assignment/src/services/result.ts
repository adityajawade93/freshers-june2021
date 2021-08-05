const {client} = require('database/pg_client');

export async function subjectMarksByStudent(student_id:number){
  try{
    const text = 'SELECT subject_id, marks FROM results WHERE student_id = $1';
    const response = await client.query(text, student_id);
    return response;
  }
  catch (err) {
    console.log(err.stack);
  }
};

export async function topStudentWithSubject(class_id: number){
  try{
    const text = 'SELECT subject_id, student_id, max(marks) AS max_marks FROM results WHERE class_id = $1 GROUP BY subject_id';
    const response = await client.query(text, class_id);
    return response;
  }
  catch(err){
    console.log(err.stack);
  }
};

export async function topScoreStudents(class_id: number, subject_id: number){
  try{
    const text = 'SELECT student_id, class_id, subject_id, SUM(marks) AS total_marks FROM results WHERE class_id = $1, subject_id = $2 GROUP BY student_id ORDER BY total_marks desc LIMIT 10';
    const value = [class_id, subject_id];
    const response = await client.query(text,value);
    return response;
  }
  catch(err){
    console.log(err.stack);
  }
};
