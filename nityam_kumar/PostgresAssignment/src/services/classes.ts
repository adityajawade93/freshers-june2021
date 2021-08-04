/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import db from "../db";

import AppError from "../utils/appError";

export const getClasses = async () => {
  try {
    const data = await db.query(
      "select distinct cl_no as class from student order by cl_no"
    );
    return data.rows;
  } catch (err) {
    throw new AppError("Internal Server Error", 500);
  }
};

export const getSchedule = async () => {
  try {
    const data =
      await db.query(`select c.cl_no as class_no,s1.sub_id,s1.sub_name as subject_name,t1.teacher_id,concat(t1.fname,' ',t1.lname) as teacher_name 
      from classes as c
      inner join subject as s1
      on s1.sub_id=c.sub_id
      inner join teacher as t1
      on t1.teacher_id=c.teacher_id
      order by class_no`);
    return data.rows;
  } catch (err) {
    throw new AppError("Internal Server Error", 500);
  }
};

export const getClassSchedule = async (classNumber: number) => {
  try {
    const data = await db.query(
      `select sub_name,sub_id from subject where cl_no =$1 order by sub_name`,
      [classNumber]
    );
    return data.rows;
  } catch (err) {
    throw new AppError("Internal Server Error", 500);
  }
};

export const fetchStudentsWithClass = async (class_number: number) => {
  try {
    const data = await db.query(
      "select * from student where cl_no=$1 order by fname ",
      [class_number]
    );
    return data.rows;
  } catch (err) {
    throw new AppError("Internal Server Error", 500);
  }
};