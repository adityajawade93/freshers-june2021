const tchclient = require("../database/dbconnect");

exports.get_teacher = async () => {
    await tchclient.query("set search_path to myschool");
    return await tchclient.query("select * from teachers");
  };

  exports.add_teacher = async (
    t_id: number,
    t_fname: string,
    t_lname: string,
    gender: string
  ) => {
    await tchclient.query("set search_path to myschool");
    const data = [t_id, t_fname, t_lname, gender];
    return await tchclient.query(
      "insert into teachers values($1,$2,$3,$4)",
      data
    );
  };