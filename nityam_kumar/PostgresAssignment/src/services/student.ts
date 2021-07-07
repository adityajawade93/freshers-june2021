import db from "../config/db";
import { QueryResult } from "pg";
interface Student {
  cl_no: number;
  age: number;
  st_id?: string;
  fname: string;
  lname: string;
  sex?: string;
}

export const addStudentDB = async (s1: Student) => {
  try {
    const text = "INSERT INTO student VALUES($1,$2,$3,$4,$5,$6)";
    const values = [
      s1.st_id,
      s1.fname.trim(),
      s1.lname.trim(),
      s1.age,
      s1.cl_no,
      s1.sex,
    ];
    const result: QueryResult<any> = await db.query(text, values);
    if (result && result.command === "INSERT") return true;
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

export const modifyStudentDB = async (
  fname: string | null | undefined,
  lname: string | null | undefined,
  age: number | null | undefined,
  cl_no: number | null | undefined,
  st_id: string
) => {
  try {
    if (fname && typeof fname === "string") {
      await db.query("update student set fname=$1 where st_id=$2", [
        fname.trim(),
        st_id,
      ]);
    }

    if (lname && typeof lname === "string") {
      await db.query("update student set lname=$1 where st_id=$2", [
        lname.trim(),
        st_id,
      ]);
    }

    if (age && typeof age === "number") {
      await db.query("update student set age=$1 where st_id=$2", [age, st_id]);
    }

    if (cl_no && typeof cl_no === "number") {
      await db.query("update student set cl_no=$1 where st_id=$2", [
        cl_no,
        st_id,
      ]);
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export const checkExists = async (st_id: string) => {
  try {
    const res = await db.query("select * from student where st_id =$1", [
      st_id,
    ]);
    if (res.rows.length === 0) {
      return false;
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export const countStudents = async () => {
  try {
    const result = await db.query("SELECT count(*) from student");
    return result.rows[0].count;
  } catch (e) {
    throw Error(e);
  }
};

export const getStudentsDB = async (start_index: number, req_size: number) => {
  try {
    const data = await db.query("SELECT * from student offset $1 limit $2", [
      start_index,
      req_size,
    ]);
    return data.rows;
  } catch (e) {
    throw Error(e);
  }
};
