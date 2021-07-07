import db from "../config/db";
import { QueryResult } from "pg";
interface Mark {
  st_id: string;
  sub_id: string;
  marks: number;
  teacher_id: string;
  cl_no: number;
}

export const fetchMarksDB = async (st_id: string) => {
  try {
    const data = await db.query(
      "select s.fname,s.lname,s.cl_no,m1.marks from marks as m1,student as s where m1.st_id=$1 and s.st_id= m1.st_id",
      [st_id.trim()]
    );
    return data.rows;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchHighestMarksPerSubjectDB = async () => {
  try {
    const data = await db.query(
      "select concat(s1.fname,' ',s1.lname)as student_name,s1.age as student_age,s1.cl_no as class_no,maxa.sub_id,sub1.sub_name,maxa.marks as highest_marks,maxa.teacher_id,concat(t1.fname,' ',t1.lname) as teacher_name from student as s1 inner join (select m.st_id,m.sub_id,m.marks,m.cl_no,m.teacher_id from marks as m inner join ( select MAX(marks) as maximum,(sub_id) from marks  group by sub_id order by sub_id )maxmarks on maxmarks.maximum=m.marks)maxa on maxa.st_id=s1.st_id inner join subject as sub1 on maxa.sub_id=sub1.sub_id inner join teacher as t1 on t1.teacher_id=maxa.teacher_id order by highest_marks desc"
    );
    return data.rows;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchTopBYNumberDB = async (number: number) => {
  try {
    const data = await db.query(
      `select s1.st_id as student_id,Concat(s1.fname,' ',s1.lname)as student_name,s1.age as student_age,s1.cl_no as class_no,total.total_marks from student as s1 inner join (select st_id,sum(marks)as total_marks  from marks group by st_id limit 10)total on total.st_id=s1.st_id order by total.total_marks desc limit $1`,
      [number]
    );
    return data.rows;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchTopperPerClassDB = async () => {
  try {
    const data =
      await db.query(`select maxa3.class_no,maxa3.highest_marks,maxa3.student_id,concat(fname,' ',lname)as student_name,age as student_age
        from student
        inner join
        (select maxa2.class_no,maxa2.maximum as highest_marks,first_table.student_id as student_id from
        (select sum(marks) as total_sum,cl_no as class_no,st_id as student_id
        from marks
        group by st_id,cl_no)as first_table
        inner join
        (select max(maxa.total_sum) as maximum,maxa.class_no
        from (select sum(marks) as total_sum,cl_no as class_no,st_id as student_id
        from marks
        group by st_id,cl_no)as maxa
        group by maxa.class_no)as maxa2
        on maxa2.maximum=first_table.total_sum)as maxa3
        on maxa3.student_id=st_id
        order by maxa3.highest_marks desc`);
    return data.rows;
  } catch (err) {
    throw new Error(err);
  }
};

export const checkStudentExist = async (m1: Mark) => {
  try {
    const text4 = "select * from student where st_id =$1";
    const values4 = [m1.st_id.trim()];
    const check_student = await db.query(text4, values4);
    if (check_student.rows.length === 0) {
      return false;
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export const checkSubjectExist = async (m1: Mark) => {
  try {
    const text5 =
      "select * from classes where cl_no =$1 and sub_id =$2 and teacher_id =$3";
    const values5 = [m1.cl_no, m1.sub_id.trim(), m1.teacher_id.trim()];
    const check_subject_cl = await db.query(text5, values5);
    if (check_subject_cl.rows.length === 0) {
      return false;
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export const checkAlreadyExist = async (m1: Mark) => {
  try {
    const text6 =
      "select * from marks where cl_no =$1 and sub_id =$2 and teacher_id =$3";
    const values6 = [m1.cl_no, m1.sub_id.trim(), m1.teacher_id.trim()];
    const check_already_exist = await db.query(text6, values6);
    if (check_already_exist.rows.length > 0) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

export const addMarkDB = async (m1: Mark) => {
  try {
    const text = "INSERT INTO marks VALUES($1,$2,$3,$4,$5)";
    const values = [
      m1.st_id.trim(),
      m1.sub_id.trim(),
      m1.marks,
      m1.teacher_id.trim(),
      m1.cl_no,
    ];
    const result: QueryResult<any> = await db.query(text, values);
    // console.log(result);
    if (result && result.command === "INSERT") return true;
    return false;
  } catch (err) {
    throw new Error(err);
  }
};

export const checkExist = async (st_id: string, sub_id: string) => {
  try {
    const res = await db.query(
      "select * from marks where st_id =$1 and sub_id=$2",
      [st_id.trim(), sub_id.trim()]
    );
    if (res.rows.length === 0) {
      return false;
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

export const ModifyMarksDB = async (
  marks: number | null | undefined,
  st_id: string,
  sub_id: string
) => {
  try {
    if (marks && typeof marks === "number") {
      await db.query(
        "update marks set marks=$1 where st_id =$2 and sub_id=$3",
        [marks, st_id.trim(), sub_id.trim()]
      );
    }
    return true;
  } catch (err) {
    throw new Error(err);
  }
};
