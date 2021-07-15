const classClient = require("../database/dbconnect");

exports.get_classes = async () => {
  try {
    await classClient.query("set search_path to myschool");
    return await classClient.query("select * from classes");
  } catch (err) {
    throw err;
  }
};

exports.add_student_to_class = async (classId: number, stId: number) => {
  try {
    await classClient.query("set search_path to myschool");
    const data = [classId, stId];
    return await classClient.query("insert into myschool.classes values($1,$2)", data);
  } catch (err) {
    throw err;
  }
};
