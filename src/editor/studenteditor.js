const client = require("../db")

/////////////////////////////////////////////////////////////////////////////////////////////////////


async function addStudent(studentID,name,gender,phone,classID){
    
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
        .catch((err)=>{
            reject(err)
            return client.query('rollback')
        })
    
    })
}

async function getStudent(){
    console.log('hey student list')
    return new Promise((resolve,reject)=>{
        let query = "select * from school.student ";
        client.query(query,[],(err,res)=>{
            if(err){
                reject(err);
            }else{
                resolve(res.rows);
            }
        });
    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////


async function addSubject(subjectID,name){
    client.query("INSERT INTO school.subject values ($1,$2)", [subjectID,name])
    .then(()=>{
        resolve (`subject ${name} added to the database`);
    })
    .catch((err)=>{
        reject (err);
    })

}

async function getSubject(){
    console.log('hey, you asked for subject list');
    return new Promise((resolve,reject)=>{
        let query = 'select * from school.subject';
        client.query(query,[],(err,res)=>{
            if(err){
                reject(err);
            }
            else {
                resolve(res.rows);
            }
        })
    })
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

async function addTeacher(teacherID,name,gender,phone,subjectID){
    return new Promise((resolve,reject)=>{
        client.query('begin')
        .then(()=>{
            let query = "INSERT INTO school.teacher values ($1,$2,$3,$4)"
            return client.query(query,[teacherID,name,gender,phone])
        })
        .then(()=>{
            let query = "INSERT INTO school.takes values ($1,$2)"
            return client.query(query,[teacherID,subjectID]);
        })
        .then(()=>{
            return client.query('commit');
        })
        .then(()=>{
            resolve(`${name} teacher added to the database`)
        })
        .catch((err)=>{
            reject(err);
            return client.query('rollback');
        })
    })
}

async function getTeacher(){
    console.log('hey teacher list');
    return new Promise((resolve,reject)=>{
    client.query("select * from school.teacher",[],(err,res)=>{
            if(err){
                reject (err);
            }
            else resolve(res.rows);
        })
    })
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////////


async function addClass(classID,room,subjectID){
    return new Promise((resolve, reject)=>{
        client.query("INSERT INTO school.class values ($1,$2)", [classID, room])
        .then(()=>{
            client.query("INSERT into school.having_subject values ($1,$2)",[classID, subjectID])
        })
        .then(()=>{
            resolve(`class ID ${classID} with subject ${subjectID} is added to the database`)
        })
        .catch((err)=>{
            reject (err);
        })
    })
}

async function getClass(){
    return new Promise((resolve,reject)=>{
        client.query('select * from school.class',[],(err,res)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(res.rows);
            }
        })
    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

async function getStudentFromClassID(id){
    return new Promise((resolve,reject)=>{
        client.query('select * from school.student where studentID IN (select studentID from school.studies_in where classID = $1)',[id],
        (err,res)=>{
            if(err)reject (err);
            else resolve(res.rows);
        })
    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getStudentFromSubjectID(id){
    return new Promise((resolve,reject)=>{
        client.query('select * from school.student where studentid in (select studentid from school.studies_in where classid in (select classid from school.having_subject where subjectid = $1))', [id],
        (err,res)=>{
            if(err)reject (err);
            else resolve(res.rows);
        })
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

async function getStudentFromTeacherID(id){
    return new Promise((resolve,reject)=>{
        client.query('select * from school.student where studentid in (select studentid from school.studies_in where classid in (select classid from school.having_subject where subjectid in (select subjectid from school.takes where teacherid = $1 )))', [id],
        (err,res)=>{
            if(err)reject (err);
            else resolve(res.rows);
        })
    })
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////



module.exports ={
    addStudent,getStudent,addSubject,getSubject,addTeacher,getTeacher,addClass,getClass,
    getStudentFromClassID,getStudentFromSubjectID,getStudentFromTeacherID
};
