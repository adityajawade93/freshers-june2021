const studentClient = require("../database/dbconnect");

exports.get_student = async () => {
  try {
    await studentClient.query("set search_path to myschool");
    return await studentClient.query("select * from students");
  } catch (err) {
    throw err;
  }
};

exports.get_student_length = async () => {
  try {
    await studentClient.query("set search_path to myschool");
    return await studentClient.query("select Count(*) from students");
  } catch (err) {
    throw err;
  }
};

exports.get_student_by_classid = async (classId: number) => {
  try {
    await studentClient.query("set search_path to myschool");
    return await studentClient.query(
      `select S.studentId,S.name,S.dob,S.gender from students as S,classes where classId=${classId} and studentId=stId`
    );
  } catch (err) {
    throw err;
  }
};

exports.get_student_by_teacherid = async (teacherId: number) => {
  try {
    await studentClient.query("set search_path to myschool");
    return await studentClient.query(
      `select S.studentId,S.name,S.dob,S.gender from students as S,classes,class_schedule where teach_Id=${teacherId} and classId=cls_Id and stId=studentId`
    );
  } catch (err) {
    throw err;
  }
};

exports.get_student_by_subjectid = async (subjectId: number) => {
  try {
    await studentClient.query("set search_path to myschool");
    return await studentClient.query(
      `select S.studentId,S.name,S.dob,S.gender from students AS S,classes,class_schedule 
      where subjId=${subjectId} and classId=cls_Id and stId=studentId`
    );
  } catch (err) {
    throw err;
  }
};

exports.add_student = async (
  studentId: number,
  name: string,
  dob: string,
  gender: string
) => {
  try {
    await studentClient.query("set search_path to myschool");
    const data = [studentId, name, dob, gender];
    return await studentClient.query(
      "insert into students values($1,$2,$3,$4)",
      data
    );
  } catch (err) {
    throw err;
  }
};
