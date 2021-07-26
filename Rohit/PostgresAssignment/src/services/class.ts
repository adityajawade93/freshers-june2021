const classSql = require('../database/dbconnect')

exports.get_classes = async () => {
  try {
    await classSql.query("set search_path to myschool");
    return await classSql.query("select * from classes");
  } catch (err) {
    throw err;
  }
};

exports.add_student_to_class = async (classId: number, stId: number) => {
  try {
    await classSql.query("set search_path to myschool");
    const data = [classId, stId];
    return await classSql.query("insert into myschool.classes values($1,$2)", data);
  } catch (err) {
    throw err;
  }
};
