import db from "../db";

import AppError from "../utils/appError";

interface IStudent {
  class_number: number;
  age: number;
  student_id?: string;
  fname: string;
  lname: string;
  sex?: string;
}

export const addStudent = async (s1: IStudent) => {
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
    await db.query(text, values);
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};

export const modifyStudent = async (
  fname: string | null | undefined,
  lname: string | null | undefined,
  age: number | null | undefined,
  class_number: number | null | undefined,
  student_id: string
) => {
  try {
    if (
      fname &&
      typeof fname === "string" &&
      fname.length >= 3 &&
      fname.length <= 25
    ) {
      await db.query("update student set fname=$1 where st_id=$2", [
        fname.trim(),
        student_id,
      ]);
    }

    if (
      lname &&
      typeof lname === "string" &&
      lname.length >= 3 &&
      lname.length <= 25
    ) {
      await db.query("update student set lname=$1 where st_id=$2", [
        lname.trim(),
        student_id,
      ]);
    }

    if (age && typeof age === "number" && age > 0 && age <= 110) {
      await db.query("update student set age=$1 where st_id=$2", [
        age,
        student_id,
      ]);
    }

    if (
      class_number &&
      typeof class_number === "number" &&
      class_number > 0 &&
      class_number <= 12
    ) {
      await db.query("update student set cl_no=$1 where st_id=$2", [
        class_number,
        student_id,
      ]);
    }
  } catch (err) {
    throw new AppError(err.message, 502);
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

export const getStudents = async (start_index: number, req_size: number) => {
  try {
    const data = await db.query(
      "SELECT * from student order by fname  offset $1 limit $2 ",
      [start_index, req_size]
    );
    return data.rows;
  } catch (err) {
    throw new AppError(err.message, 502);
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
    throw new AppError(err.message, 502);
  }
};
