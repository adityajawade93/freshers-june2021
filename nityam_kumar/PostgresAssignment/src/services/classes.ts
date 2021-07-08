import db from "../config/db";

export const getClassesDB = async () => {
  try {
    const data = await db.query("select distinct cl_no as class from student");
    return data.rows;
  } catch (err) {
    throw new Error(err);
  }
};

export const getScheduleDB = async () => {
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
    throw new Error(err);
  }
};

export const getClassScheduleDB = async (classNumber: number) => {
  try {
    const data = await db.query(
      `select sub_name,sub_id from subject where cl_no =$1`,
      [classNumber]
    );
    return data.rows;
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchStudentsWithClassDB = async (class_number: number) => {
  try {
    const data = await db.query("select * from student where cl_no=$1", [
      class_number,
    ]);
    return data.rows;
  } catch (err) {
    throw new Error(err);
  }
};
