import {client as sqlclient} from '../database/db';

export async function get_topper_by_classid_and_subjectid(c_id:number,s_id:number){
    try{
    await sqlclient.query("SET search_path TO College");
          return (await sqlclient.query(`SELECT student_id,fname,S.marks FROM (SELECT * FROM result WHERE clas_id=${c_id} AND subjectid=${s_id} ORDER BY marks DESC) AS S,Student WHERE S.studentid=student_id LIMIT 1`)); 
    }catch(e){
        throw Error(e);
    }
}

export async function get_top_students(c_id:number,num:number){
    try{
    await sqlclient.query("SET search_path TO College");
          return (await sqlclient.query(`SELECT s.student_id , s.fname , a.total_marks
          FROM college.student s
          INNER JOIN(
          SELECT SUM(r.marks) AS total_marks , s.student_id
          FROM college.student s
          JOIN college.class_student ON class_student.studid = s.student_id
          JOIN college.class_schedule c ON class_student.class_id = c.classid
          JOIN college.result r ON r.studentid = s.student_id
          WHERE c.classid =${c_id}
          GROUP BY s.student_id
          ) a
          ON s.student_id = a.student_id
          ORDER BY total_marks DESC
          LIMIT ${num}`)); 
    }catch(e){
        throw Error(e);
    }
}