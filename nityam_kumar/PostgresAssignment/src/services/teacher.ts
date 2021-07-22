import db from "../db";

import AppError from "../utils/appError";

interface ITeacher {
  age: number;
  fname: string;
  lname: string;
  teacher_id?: string;
  sex?: string;
}

export const addTeacherDB = async (t1: ITeacher) => {
  try {
    const text = "INSERT INTO teacher VALUES($1,$2,$3,$4,$5)";
    const values = [
      t1.teacher_id,
      t1.fname.trim(),
      t1.lname.trim(),
      t1.age,
      t1.sex,
    ];
    await db.query(text, values);
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};

export const checkExists = async (teacher_id: string) => {
  try {
    const res = await db.query("select * from teacher where teacher_id =$1", [
      teacher_id,
    ]);
    if (res.rows.length === 0) {
      throw new AppError(
        "Teacher with this id not available!! Enter valid teacher id",
        401
      );
    }
  } catch (err) {
    throw err;
  }
};

export const modifyTeacherDB = async (
  fname: string | null | undefined,
  lname: string | null | undefined,
  age: number | null | undefined,
  teacher_id: string | null | undefined
) => {
  try {
    if (fname && typeof fname === "string") {
      await db.query("update teacher set fname=$1 where teacher_id=$2", [
        fname.trim(),
        teacher_id,
      ]);
    }

    if (lname && typeof lname === "string") {
      await db.query("update teacher set lname=$1 where teacher_id=$2", [
        lname.trim(),
        teacher_id,
      ]);
    }

    if (age && typeof age === "number") {
      await db.query("update teacher set age=$1 where teacher_id=$2", [
        age,
        teacher_id,
      ]);
    }
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};

export const countTeachers = async () => {
  try {
    const result = await db.query("SELECT count(*) from teacher");
    return result.rows[0].count;
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};

export const getTeachersDB = async (start_index: number, req_size: number) => {
  try {
    const data = await db.query("SELECT * from teacher offset $1 limit $2", [
      start_index,
      req_size,
    ]);
    return data.rows;
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};

export const countTeachersTeaching = async () => {
  try {
    const result = await db.query(
      "SELECT count(DISTINCT teacher_id) from subject"
    );
    return result.rows[0].count;
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};

export const getTeachersTeachingDB = async (
  start_index: number,
  req_size: number
) => {
  try {
    const data = await db.query(
      "select t1.teacher_id,t1.fname,t1.lname,t1.age,t2.sub_name,t2.cl_no FROM teacher as t1 inner join subject as t2 on t1.teacher_id=t2.teacher_id offset $1 limit $2",
      [start_index, req_size]
    );
    return data.rows;
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};

export const fetchStudentWithTeacherID = async (teacher_id: string) => {
  try {
    const data = await db.query(
      "select s1.st_id,s1.fname,s1.lname,s1.age,s1.cl_no from student as s1 where s1.cl_no in (select distinct cl_no from subject as sub where teacher_id=$1",
      [teacher_id]
    );
    if (data.rows.length === 0) {
      throw new AppError("ID NOT FOUND", 404);
    }
    return data.rows;
  } catch (e) {
    throw e;
  }
};
