const sqlserver = require('../sqlserver');

async function checkSubject(studentId :string , subjectId : string ) {
    
    let query = `
    SELECT s.sid
    FROM school.student s
    INNER JOIN school.studies_in ON s.sid = studies_in.sid
    INNER JOIN (
	SELECT c.classid,sb.subjectname,sb.subjectid
    FROM school.class c 
    INNER  JOIN school.schedule s ON c.classid = s.classid 
    INNER  JOIN school.subject sb ON s.subjectid = sb.subjectid
    WHERE sb.subjectid = $1
    ) c ON studies_in.classid = c.classid
    WHERE s.sid = $2
   `;
 return new Promise((resolve, reject) => {
     sqlserver.query(query, [subjectId,studentId],(err: any, res: any) => {

         if (err)
             reject(err);
         else
             {
                 if(res.rows.length==0)
                   resolve(false);
                  else  
                  resolve(true);
             }

     })

 })


}

async function addMarks(studentId :string , subjectId : string, marks : number) {

    let query = `
     INSERT INTO school.result(SUBJECTID,SID,marks) VALUES($1,$2,$3);
    `;
    return new Promise((resolve, reject) => {
        sqlserver.query(query, [subjectId,studentId,marks], (err: any, res: any) => {

            if (err)
                reject(err);
            else
                resolve("marks added");

        })

    })
    
}

async function updateMarks(studentId :string , subjectId : string, marks : number) {

    let query = `
      UPDATE school.result
      SET marks = $1
      WHERE SUBJECTID = $2 AND SID = $3
    `;
    return new Promise((resolve, reject) => {
        sqlserver.query(query, [marks,subjectId,studentId], (err: any, res: any) => {

            if (err)
                reject(err);
            else
                resolve("marks added");

        })

    })
    
}

async function getMarks(studentId :string ) {
    
   let query = `
   SELECT s.subjectname , r.marks
FROM school.result r
LEFT JOIN school.subject s
ON r.subjectid = s.subjectid
WHERE r.sid = $1;
   `
   return new Promise((resolve, reject) => {
    sqlserver.query(query, [studentId], (err: any, res: any) => {

        if (err)
            reject(err);
        else {
            let data = [];
            for (let i = 0; i < res.rows.length; i++) {
                data.push(
                    {
                        "subjectName" : res.rows[i].subjectname,
                        "marks" : res.rows[i].marks

                    }

                );
            }
            resolve(data);

        }

    })

})


}

async function getHighestMarksPerSubject(classId : string)
{
 
    let query = `
    SELECT s.sid,s.name , a.subjectname , a.max_marks
    FROM(
    SELECT sb.subjectname,MAX(r.marks) AS max_marks
    FROM school.student s
    LEFT JOIN school.studies_in ON studies_in.sid = s.sid
    LEFT JOIN school.class c ON studies_in.classid = c.classid
    LEFT JOIN school.result r ON r.sid = s.sid
    LEFT JOIN school.subject sb ON r.subjectid = sb.subjectid
    WHERE c.classid = $1
    GROUP BY subjectname
    ) a
    JOIN (
	SELECT s.SID ,s.name , sb.subjectname , r.marks
    FROM school.student s
    LEFT JOIN school.result r ON r.sid = s.sid
    LEFT JOIN school.subject sb ON r.subjectid = sb.subjectid
   ) s

    ON a.max_marks = s.marks AND a.subjectname = s.subjectname;

   `;
   return new Promise((resolve, reject) => {
    sqlserver.query(query, [classId], (err: any, res: any) => {

        if (err)
            reject(err);
        else {
            let data = [];
            for (let i = 0; i < res.rows.length; i++) {
                data.push(
                    {
                        "studentId" : res.rows[i].sid,
                        "studentName": res.rows[i].name,
                        "subjectName" : res.rows[i].subjectname,
                        "max_marks" : res.rows[i].max_marks

                    }

                );
            }
            resolve(data);

        }

    })

})

}

async function getTop10Marks(classId : string) {

    let query = `
    SELECT s.sid , s.name , a.total_marks
    FROM school.student s
    INNER JOIN(
    SELECT SUM(r.marks) AS total_marks , s.sid
    FROM school.student s
    JOIN school.studies_in ON studies_in.sid = s.sid
    JOIN school.class c ON studies_in.classid = c.classid
    JOIN school.result r ON r.sid = s.sid
    WHERE c.classid =  $1
    GROUP BY s.sid
    ) a
    ON s.sid = a.sid
    ORDER BY total_marks DESC
    LIMIT 10
    `;

    return new Promise((resolve, reject) => {
        sqlserver.query(query, [classId], (err: any, res: any) => {
    
            if (err)
                reject(err);
            else {
                let data = [];
                for (let i = 0; i < res.rows.length; i++) {
                    data.push(
                        {
                            "studentId" : res.rows[i].sid,
                            "studentName": res.rows[i].name,
                            "total_marks" : res.rows[i].total_marks
    
                        }
    
                    );
                }
                resolve(data);
    
            }
    
        })
    
    })
    
    
}

module.exports = {
    checkSubject,addMarks,updateMarks,getMarks,getHighestMarksPerSubject,getTop10Marks
}