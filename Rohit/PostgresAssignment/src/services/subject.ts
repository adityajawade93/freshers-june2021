const subjecteSql = require('../database/dbconnect')

exports.get_subject = async () => {
  try {
    await subjecteSql.query("set search_path to myschool");
    return await subjecteSql.query("select * from subject");
  } catch (err) {
    throw err;
  }
};

exports.add_subject = async (subjectId: number, subject_name: string) => {
  try {
    await subjecteSql.query("set search_path to myschool");
    const data = [subjectId, subject_name];
    return await subjecteSql.query("insert into subject values($1,$2)", data);
  } catch (err) {
    throw err;
  }
};
