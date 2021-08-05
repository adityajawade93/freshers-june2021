const {client} = require('../database/pg_client');

export async function getStudentList(){
  try{
    const response = await client.query('SELECT * FROM students');
    return response;
  }
  catch (err) {
    console.log(err.stack);
  }
};

export async function getStudentInfoByStudentId(student_id: number){
  try{
    const response = await client.query('SELECT * FROM students WHERE student_id = $1', student_id);
    return response;
  }
  catch (err) {
    console.log(err.stack);
  }
};

export async function getStudentListByStudentId(...arr: number[]) {
  try{
    let params = [];
    for (let i = 1; i < arr.length; i++) {
      params.push(`$${i}`);
    }
    const response = await client.query(`SELECT student_name FROM students WHERE student_id IN ( ${params.join(',')} )`, arr);
    return response;
  }
  catch (err) {
    console.log(err.stack);
  }
};

export async function addStudentToList(student_id:number, student_name: string, 
student_dob: Date, student_address: object,gender: string, phone: string){
  try{
    const text = 'INSERT INTO students VALUES($1,$2,$3,$4,$5,$6)';
    const value = [student_id, student_name, student_dob, student_address, gender, phone];
    const response = await client.query(text, value);
    return response.rows[0];
  }
  catch (err) {
    console.log(err.stack);
  }
};

export async function updateStudentToList(student_id:number, student_name: string,
  student_dob: Date, student_address: object, gender:string, phone:string){
    try{
      const text = 'UPDATE students SET student_name = $2,student_dob = $3,student_address = $4, gender = $5, phone = $6 WHERE student_id = $1';
      const value = [student_id,student_name, student_dob, student_address, gender, phone];
      const response = await client.query(text,value);
      return response.rows[0];
    }
    catch(err) {
      console.log(err.stack);
    }
};
