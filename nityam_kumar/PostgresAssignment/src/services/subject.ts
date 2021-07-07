import db from "../config/db";
import { QueryResult } from "pg";

interface Subject {
  sub_id?: string;
  sub_name: string;
  teacher_id: string;
  cl_no: number;
}

export const getSubjectDB = async () => {
  try {
    const data = await db.query("select * from subject");
    return data.rows;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchStudentsWithSubDB = async (sub_id: string) => {
  try {
    const data = await db.query(
      "select s1.fname,s1.lname,s1.cl_no,s1.age,sub.sub_id,sub.sub_name from subject as sub,student as s1 where sub.sub_id=$1 and sub.cl_no=s1.cl_no",
      [sub_id.trim()]
    );
    return data.rows;
  } catch (err) {
    throw new Error(err);
  }
};

export const checkAlreadyExistDB = async (s1: Subject) => {
  try {
    const text5 = "select * from subject where cl_no=$1 and sub_name=$2";
    const values5 = [s1.cl_no, s1.sub_name.trim()];
    const check_already_exist = await db.query(text5, values5);
    if (check_already_exist.rows.length > 0) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

export const addSubjectDB = async (s1: Subject) => {
  try {
    const text = "INSERT INTO subject VALUES($1,$2,$3,$4)";
    const values = [
      s1.sub_id,
      s1.sub_name.trim(),
      s1.cl_no,
      s1.teacher_id.trim(),
    ];
    const result: QueryResult<any> = await db.query(text, values);
    if (result && result.command === "INSERT") return true;
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

export const addTeachesDB = async (s1: Subject) => {
  try {
    const text2 = "INSERT INTO teaches VALUES($1,$2)";
    const values2 = [s1.teacher_id.trim(), s1.sub_id];
    const result: QueryResult<any> = await db.query(text2, values2);
    if (result && result.command === "INSERT") return true;
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

export const addClassDB = async (s1: Subject) => {
  try {
    const text3 = "INSERT INTO classes VALUES($1,$2,$3)";
    const values3 = [s1.cl_no, s1.sub_id, s1.teacher_id.trim()];
    const result: QueryResult<any> = await db.query(text3, values3);
    if (result && result.command === "INSERT") return true;
    return false;
  } catch (err) {
    throw new Error(err);
  }
};
