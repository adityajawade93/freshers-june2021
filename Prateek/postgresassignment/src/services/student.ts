import { client as sqlclient } from "../database/db";

export async function get_student() {
  try {
    
    return await sqlclient.query("SELECT * FROM Students");
  } catch (e) {
    throw Error(e);
  }
}

export async function get_student_length() {
  try {
   
    return await sqlclient.query("SELECT Count(*) FROM Students");
  } catch (e) {
    throw Error(e);
  }
}

export async function add_student(
  roll_num: number,
  fname: string,
  lname: string,
  standard: number,
  subcode: number
) {
  try {
    await sqlclient.query("SET search_path TO school");
    const data = [roll_num, fname, lname, standard, subcode];
    return await sqlclient.query(
      "INSERT INTO Students values($1,$2,$3,$4,$5)",
      data
    );
  } catch (e) {
    throw Error(e);
  }
}
