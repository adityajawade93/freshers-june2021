/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import db from "../db";

import AppError from "../utils/appError";

interface IStudent {
  class_number: number;
  age: number;
  student_id?: string;
  fname: string;
  lname: string;
  sex?: string;
  dob: Date;
}

export const addStudent = async (s1: IStudent) => {
  try {
    const text = "INSERT INTO student VALUES($1,$2,$3,$4,$5,$6,$6)";
    const values = [
      s1.student_id,
      s1.fname.trim(),
      s1.lname.trim(),
      s1.age,
      s1.class_number,
      s1.sex,
      s1.dob,
    ];
    await db.query(text, values);
  } catch (err) {
    throw new AppError("Internal Server Error", 500);
  }
};

export const modifyStudent = async (
  fname: string | null | undefined,
  lname: string | null | undefined,
  age: number | null | undefined,
  class_number: number | null | undefined,
  student_id: string,
  dob: string | null | undefined
) => {
  try {
    if (fname) {
      await db.query("update student set fname=$1 where st_id=$2", [
        fname.trim(),
        student_id,
      ]);
    }

    if (lname) {
      await db.query("update student set lname=$1 where st_id=$2", [
        lname.trim(),
        student_id,
      ]);
    }

    if (age) {
      await db.query("update student set age=$1 where st_id=$2", [
        age,
        student_id,
      ]);
    }

    if (class_number) {
      await db.query("update student set cl_no=$1 where st_id=$2", [
        class_number,
        student_id,
      ]);
    }

    if (dob) {
      await db.query("update student set dob=$1 where st_id=$2", [
        dob,
        student_id,
      ]);
    }
  } catch (err) {
    throw new AppError("Internal Server Error", 500);
  }
};

export const checkExists = async (student_id: string) => {
  try {
    const res = await db.query("select * from student where st_id =$1", [
      student_id,
    ]);
    return res.rows.length;
  } catch (err) {
    throw new AppError("Internal Server Error", 500);
  }
};

export const countStudents = async () => {
  try {
    const result = await db.query("SELECT count(*) from student");
    return result.rows[0].count;
  } catch (err) {
    throw new AppError("Internal Server Error", 500);
  }
};

export const getStudents = async (start_index: number, req_size: number) => {
  try {
    const data = await db.query(
      "SELECT * from student order by fname  offset $1 limit $2 ",
      [start_index, req_size]
    );
    return data.rows;
  } catch (err) {
    throw new AppError("Internal Server Error", 500);
  }
};

export const getStudentSchedule = async (studentId: string) => {
  try {
    const data = await db.query(
      `select sub_name,sub_id from subject where cl_no = (select cl_no from student where st_id=$1) order by sub_name;`,
      [studentId]
    );
    return data.rows;
  } catch (err) {
    throw new AppError("Internal Server Error", 500);
  }
};
