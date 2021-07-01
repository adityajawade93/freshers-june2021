const sqlclient=require('../connect_database/db');

exports.get_teacher = async () => {
    await sqlclient.query("SET search_path TO College");
          return (await sqlclient.query("SELECT * FROM Teacher")); 
        }

 exports.get_student = async () => {
    await sqlclient.query("SET search_path TO College");
          return (await sqlclient.query("SELECT * FROM Student")); 
        }

exports.get_student_length = async () => {
            await sqlclient.query("SET search_path TO College");
                  return (await sqlclient.query("SELECT Count(*) FROM Student")); 
        }

exports.get_subject = async () => {
                    await sqlclient.query("SET search_path TO College");
                          return (await sqlclient.query("SELECT * FROM subject")); 
        }

exports.get_class = async () => {
            await sqlclient.query("SET search_path TO College");
                  return (await sqlclient.query("SELECT * FROM Class_schedule")); 
        }

exports.get_student_by_classid = async (id:number) => {
            await sqlclient.query("SET search_path TO College");
                  return (await sqlclient.query(`SELECT S.student_id,S.fname FROM Student AS S,class_student WHERE class_id=${id} AND studid=student_id`)); 
        }

exports.get_student_by_teacherid = async (id:number) => {
            await sqlclient.query("SET search_path TO College");
                  return (await sqlclient.query(`SELECT S.student_id,S.fname FROM Student AS S,class_student,class_schedule WHERE t_id=${id} AND class_id=classid AND studid=student_id`)); 
        }

exports.get_student_by_subjectid = async (id:number) => {
            await sqlclient.query("SET search_path TO College");
                  return (await sqlclient.query(`SELECT S.student_id,S.fname FROM Student AS S,class_student,class_schedule WHERE subj_id=${id} AND class_id=classid AND studid=student_id`)); 
        }

exports.get_subjectmarks_by_subjectid = async (id:number) => {
            await sqlclient.query("SET search_path TO College");
                  return (await sqlclient.query(`SELECT subject_id,subject_name,marks FROM result,subject WHERE studentid=${id} AND subjectid=subject_id`)); 
        }

exports.get_topper_by_classid_and_subjectid = async (c_id:number,s_id:number) => {
            await sqlclient.query("SET search_path TO College");
                  return (await sqlclient.query(`SELECT student_id,fname,S.marks FROM (SELECT * FROM result WHERE clas_id=${c_id} AND subjectid=${s_id} ORDER BY marks DESC) AS S,Student WHERE S.studentid=student_id LIMIT 1`)); 
        }

exports.add_student = async (student_id:number,fname:string,mname:string,lname:string,dob:string,gender:string,address:string) => {
            await sqlclient.query("SET search_path TO College");
            const data = [student_id,fname,mname,lname,dob,gender,address];
                  return (await sqlclient.query("INSERT INTO Student values($1,$2,$3,$4,$5,$6,$7)",data)); 
        }

exports.add_teacher = async (teacher_id:number,fname:string,mname:string,lname:string,dob:string,gender:string,address:string) => {
            await sqlclient.query("SET search_path TO College");
            const data = [teacher_id,fname,mname,lname,dob,gender,address];
                  return (await sqlclient.query("INSERT INTO Teacher values($1,$2,$3,$4,$5,$6,$7)",data)); 
        }

exports.add_student_in_class = async (class_id:number,studid:number) => {
            await sqlclient.query("SET search_path TO College");
            const data = [class_id,studid];
                  return (await sqlclient.query("INSERT INTO class_student values($1,$2)",data)); 
        }

exports.add_subject = async (subject_id:number,subject_name:string) => {
            await sqlclient.query("SET search_path TO College");
            const data = [subject_id,subject_name];
                  return (await sqlclient.query("INSERT INTO Subject values($1,$2)",data)); 
        }

exports.add_class_schedule = async (classid:number,classno:number,subj_id:number,subj_name:string,t_id:number,t_fname:string) => {
            await sqlclient.query("SET search_path TO College");
            const data = [classid,classno,subj_id,subj_name,t_id,t_fname];
                  return (await sqlclient.query("INSERT ITO Class_schedule values($1,$2,$3,$4,$5,$6)",data)); 
        }

exports.add_result = async (result_id:number,studentid:number,clas_id:number,subjectid:number,marks:number) => {
            await sqlclient.query("SET search_path TO College");
            const data = [result_id,studentid,clas_id,subjectid,marks];
                  return (await sqlclient.query("INSERT INTO result values($1,$2,$3,$4,$5)",data)); 
        }





