export {};

const client = require("../db")



async function addStudent(studentID: string ,name: string,gender: string ,phone: string,classID: string){
    
    return new Promise((resolve,reject)=>{

        client.query('begin')
        .then(()=>{
            let query="INSERT INTO school.student(studentID,name,gender,phone) VALUES ($1,$2,$3,$4)"
            return client.query(query,[studentID,name,gender,phone]);
        })
        .then(()=>{
            return client.query("INSERT INTO school.studies_in (studentID,classID) VALUES ($1,$2)",
            [studentID,classID])
        })
        .then(()=>{
            return client.query('commit');
        })
        .then(()=>{
            resolve(`${name} added to database`);
        })
        .catch((err: any)=>{
            reject(err)
            return client.query('rollback')
        })
    
    })
}

async function getStudentCount(){
    return new Promise((resolve,reject)=>{
        client.query('select count (*) as count from school.student',[],(err: any,res: any)=>{
            if(err)reject(err)
            else resolve(res.rows[0].count)
        })
    })
}

async function getStudent(page: number,size: number){
    console.log('hey student list')
    return new Promise((resolve,reject)=>{
        let query = "select * from school.student offset $1 limit $2";
        client.query(query,[page*size,size],(err: any,res: any)=>{
            if(err){
                reject(err);
            }else{
                resolve(res.rows);
            }
        });
    })
}

async function getStudentFromClassID(id: string){
    return new Promise((resolve,reject)=>{
        client.query('select * from school.student where studentID IN (select studentID from school.studies_in where classID = $1)',[id],
        (err: any,res: any)=>{
            if(err)reject (err);
            else resolve(res.rows);
        })
    })
}

async function getStudentFromSubjectID(id: string){
    return new Promise((resolve,reject)=>{
        client.query('select * from school.student where studentid in (select studentid from school.studies_in where classid in (select classid from school.having_subject where subjectid = $1))', [id],
        (err:any,res: any)=>{
            if(err)reject (err);
            else resolve(res.rows);
        })
    })
}

async function getStudentFromTeacherID(id: string){
    return new Promise((resolve,reject)=>{
        client.query('select * from school.student where studentid in (select studentid from school.studies_in where classid in (select classid from school.having_subject where subjectid in (select subjectid from school.takes where teacherid = $1 )))', [id],
        (err: any,res: any)=>{
            if(err)reject (err);
            else resolve(res.rows);
        })
    })
}


module.exports ={
    addStudent,getStudent,getStudentCount,
    getStudentFromClassID,getStudentFromSubjectID,getStudentFromTeacherID
};
