import db from "../config/db";
import { QueryResult } from "pg";
import AppError from "../utils/appError";

interface IStudent {
  class_number: number;
  age: number;
  student_id?: string;
  fname: string;
  lname: string;
  sex?: string;
}

export const addStudentDB = async (s1: IStudent) => {
  try {
    const text = "INSERT INTO student VALUES($1,$2,$3,$4,$5,$6)";
    const values = [
      s1.student_id,
      s1.fname.trim(),
      s1.lname.trim(),
      s1.age,
      s1.class_number,
      s1.sex,
    ];
    const result: QueryResult<any> = await db.query(text, values);
  } catch (err) {
    throw err;
  }
};

export const modifyStudentDB = async (
  fname: string | null | undefined,
  lname: string | null | undefined,
  age: number | null | undefined,
  class_number: number | null | undefined,
  student_id: string
) => {
  try {
    if (fname && typeof fname === "string") {
      await db.query("update student set fname=$1 where st_id=$2", [
        fname.trim(),
        student_id,
      ]);
    }

    if (lname && typeof lname === "string") {
      await db.query("update student set lname=$1 where st_id=$2", [
        lname.trim(),
        student_id,
      ]);
    }

    if (age && typeof age === "number") {
      await db.query("update student set age=$1 where st_id=$2", [
        age,
        student_id,
      ]);
    }

    if (class_number && typeof class_number === "number") {
      await db.query("update student set cl_no=$1 where st_id=$2", [
        class_number,
        student_id,
      ]);
    }
  } catch (err) {
    throw err;
  }
};

export const checkExists = async (student_id: string) => {
  try {
    const res = await db.query("select * from student where st_id =$1", [
      student_id,
    ]);
    if (res.rows.length === 0) {
      throw new AppError(`student with this id not found`, 400);
    }
  } catch (err) {
    throw err;
  }
};

export const countStudents = async () => {
  try {
    const result = await db.query("SELECT count(*) from student");
    return result.rows[0].count;
  } catch (e) {
    throw e;
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
    throw e;
  }
};

export const getStudentScheduleDB = async (studentId: string) => {
  try {
    const data = await db.query(
      `select sub_name,sub_id from subject where cl_no = (select cl_no from student where st_id=$1);`,
      [studentId]
    );
    return data.rows;
  } catch (e) {
    throw Error(e);
  }
};
