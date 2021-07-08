import db from "../config/db";

import AppError from "../utils/appError";

interface IMark {
  student_id: string;
  subject_id: string;
  marks: number;
  teacher_id: string;
  class_number: number;
}

export const fetchMarksDB = async (student_id: string) => {
  try {
    const data = await db.query(
      "select s.fname,s.lname,s.cl_no,m1.marks from marks as m1,student as s where m1.st_id=$1 and s.st_id= m1.st_id",
      [student_id.trim()]
    );
    if (data.rows.length === 0) {
      throw new AppError("id not found", 404);
    }
    return data.rows;
  } catch (err) {
    throw err;
  }
};

export const fetchHighestMarksPerSubjectDB = async () => {
  try {
    const data = await db.query(
      "select concat(s1.fname,' ',s1.lname)as student_name,s1.age as student_age,s1.cl_no as class_no,maxa.sub_id,sub1.sub_name,maxa.marks as highest_marks,maxa.teacher_id,concat(t1.fname,' ',t1.lname) as teacher_name from student as s1 inner join (select m.st_id,m.sub_id,m.marks,m.cl_no,m.teacher_id from marks as m inner join ( select MAX(marks) as maximum,(sub_id) from marks  group by sub_id order by sub_id )maxmarks on maxmarks.maximum=m.marks)maxa on maxa.st_id=s1.st_id inner join subject as sub1 on maxa.sub_id=sub1.sub_id inner join teacher as t1 on t1.teacher_id=maxa.teacher_id order by highest_marks desc"
    );
    return data.rows;
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};

export const fetchHighestMarksPerSubjectWithSubjectIDDB = async (
  subject_id: string
) => {
  try {
    const data = await db.query(
      `select stu.MAX_MARKS,Concat(s1.fname,' ',s1.lname) as student_name ,s1.age as student_age,s1.st_id,s1.cl_no as class_number
    from student as s1,
    (select st_id,marks as MAX_MARKS from marks 
    INNER JOIN 
    (select max(marks) as MAX_MARKS from marks where sub_id=$1)maxa
    ON marks.marks = maxa.MAX_MARKS)stu
    where s1.st_id=stu.st_id`,
      [subject_id]
    );
    return data.rows;
  } catch (err) {
    throw new AppError(err.message, 502);
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
    throw new AppError(err.message, 502);
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
    throw new AppError(err.message, 502);
  }
};

export const fetchTopperPerClassWithClassNumberDB = async (
  classNumber: number
) => {
  try {
    const data = await db.query(
      `select highest.class_no,highest.highest_marks,highest.student_name,highest.student_age
      from
      (select maxa3.class_no,maxa3.highest_marks,maxa3.student_id,concat(fname,' ',lname)as student_name,age as student_age
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
            order by maxa3.highest_marks desc)highest
            where highest.class_no=$1`,
      [classNumber]
    );
    return data.rows;
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};

export const checkStudentExist = async (m1: IMark) => {
  try {
    const text4 = "select * from student where st_id =$1";
    const values4 = [m1.student_id.trim()];
    const check_student = await db.query(text4, values4);
    if (check_student.rows.length === 0) {
      throw new AppError(
        `student with this id not available!! Enter valid student id`,
        401
      );
    }
  } catch (err) {
    throw err;
  }
};

export const checkSubjectExist = async (m1: IMark) => {
  try {
    const text5 =
      "select * from classes where cl_no =$1 and sub_id =$2 and teacher_id =$3";
    const values5 = [
      m1.class_number,
      m1.subject_id.trim(),
      m1.teacher_id.trim(),
    ];
    const check_subject_cl = await db.query(text5, values5);
    if (check_subject_cl.rows.length === 0) {
      throw new AppError(
        `subject with this class not available!! Enter valid Details`,
        401
      );
    }
  } catch (err) {
    throw err;
  }
};

export const checkAlreadyExist = async (m1: IMark) => {
  try {
    const text6 =
      "select * from marks where cl_no =$1 and sub_id =$2 and teacher_id =$3";
    const values6 = [
      m1.class_number,
      m1.subject_id.trim(),
      m1.teacher_id.trim(),
    ];
    const check_already_exist = await db.query(text6, values6);
    if (check_already_exist.rows.length > 0) {
      throw new AppError(`data already available `, 409);
    }
  } catch (err) {
    throw err;
  }
};

export const addMarkDB = async (m1: IMark) => {
  try {
    const text = "INSERT INTO marks VALUES($1,$2,$3,$4,$5)";
    const values = [
      m1.student_id.trim(),
      m1.subject_id.trim(),
      m1.marks,
      m1.teacher_id.trim(),
      m1.class_number,
    ];
    await db.query(text, values);
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};

export const checkExist = async (student_id: string, subject_id: string) => {
  try {
    const res = await db.query(
      "select * from marks where st_id =$1 and sub_id=$2",
      [student_id.trim(), subject_id.trim()]
    );
    if (res.rows.length === 0) {
      throw new AppError(`either subject or student id not available`, 401);
    }
  } catch (err) {
    throw err;
  }
};

export const ModifyMarksDB = async (
  marks: number | null | undefined,
  student_id: string,
  subject_id: string
) => {
  try {
    if (marks && typeof marks === "number") {
      await db.query(
        "update marks set marks=$1 where st_id =$2 and sub_id=$3",
        [marks, student_id.trim(), subject_id.trim()]
      );
    }
  } catch (err) {
    throw new AppError(err.message, 502);
  }
};
