const {client} = require('database/pg_client');

export async function getClassList(){
  try{
    const text = 'SELECT * from student_class';
    const res = await client.query(text);
    return res;
  }
  catch(err) {
    console.log(err.stack);
  }
};

export async function addStudentToClassList(student_id: number, class_id: number){
  try{
    const text = 'INSERT INTO student_class (student_id, class_id) VALUES ($1,$2)';
    const value = [student_id, class_id];
    const res = await client.query(text,value);
    return res;
  }
  catch(err) {
    console.log(err.stack);
  } 
};

export async function getStudentsByClass(class_id: number){
  try{
    const text = 'SELECT student_id from student_class WHERE class_id = $1';
    const res = await client.query(text, class_id);
    return res;
  }
  catch(err) {
    console.log(err.stack);
  }
};
