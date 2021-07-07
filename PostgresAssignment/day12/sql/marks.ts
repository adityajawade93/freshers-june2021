const mrkclient = require("../database/dbconnect");


exports.get_subjectmarks_by_studentid = async (id: number) => {
    await mrkclient.query("set search_path to myschool");
    return await mrkclient.query(
      `select sub_id,sub_name,marks from result,subject where studentid=${id} and subjectid=sub_id`
    );
  };