import db from "../db";

import AppError from "../utils/appError";

interface ISubject {
  subject_id?: string;
  subject_name: string;
  teacher_id: string;
  class_number: number;
}

export const getSubjectDB = async () => {
  try {
    const data = await db.query("select * from subject order by sub_name");
    return data.rows;
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};

export const fetchStudentsWithSubDB = async (subject_id: string) => {
  try {
    const data = await db.query(
      "select s1.fname,s1.lname,s1.cl_no,s1.age,sub.sub_id,sub.sub_name from subject as sub,student as s1 where sub.sub_id=$1 and sub.cl_no=s1.cl_no",
      [subject_id.trim()]
    );
    if (data.rows.length === 0) {
      throw new AppError("id not found", 404);
    }
    return data.rows;
  } catch (err) {
    throw err;
  }
};

export const checkAlreadyExistDB = async (s1: ISubject) => {
  try {
    const text5 = "select * from subject where cl_no=$1 and sub_name=$2";
    const values5 = [s1.class_number, s1.subject_name.trim()];
    const check_already_exist = await db.query(text5, values5);
    if (check_already_exist.rows.length > 0) {
      throw new AppError("subject already exist in this class", 409);
    }
  } catch (err) {
    throw err;
  }
};

export const addSubjectDB = async (s1: ISubject) => {
  try {
    const text = "INSERT INTO subject VALUES($1,$2,$3,$4)";
    const values = [
      s1.subject_id,
      s1.subject_name.trim(),
      s1.class_number,
      s1.teacher_id.trim(),
    ];
    await db.query(text, values);
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};

export const addTeachesDB = async (s1: ISubject) => {
  try {
    const text2 = "INSERT INTO teaches VALUES($1,$2)";
    const values2 = [s1.teacher_id.trim(), s1.subject_id];
    await db.query(text2, values2);
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};

export const addClassDB = async (s1: ISubject) => {
  try {
    const text3 = "INSERT INTO classes VALUES($1,$2,$3)";
    const values3 = [s1.class_number, s1.subject_id, s1.teacher_id.trim()];
    await db.query(text3, values3);
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};
