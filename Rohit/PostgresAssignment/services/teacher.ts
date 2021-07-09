const teacherClient = require("../database/dbconnect");

exports.get_teacher = async () => {
  try {
    await teacherClient.query("set search_path to myschool");
    return await teacherClient.query("select * from teachers");
  } catch (err) {
    throw err;
  }
};

exports.add_teacher = async (
  teacherId: number,
  teacher_fname: string,
  teacher_lname: string,
  gender: string
) => {
  try {
    await teacherClient.query("set search_path to myschool");
    const data = [teacherId, teacher_fname, teacher_lname, gender];
    return await teacherClient.query(
      "insert into teachers values($1,$2,$3,$4)",
      data
    );
  } catch (err) {
    throw err;
  }
};
